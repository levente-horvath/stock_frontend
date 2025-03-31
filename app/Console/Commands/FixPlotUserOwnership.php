<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\SavedPlot;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class FixPlotUserOwnership extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'plots:fix-ownership';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Fix user ownership of saved plots';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Starting to fix plot ownership issues...');
        
        // Check if there are plots without valid user IDs
        $invalidPlots = SavedPlot::whereNotIn('user_id', function($query) {
            $query->select('id')->from('users');
        })->get();
        
        if ($invalidPlots->count() > 0) {
            $this->warn("Found {$invalidPlots->count()} plots with invalid user IDs.");
            
            if ($this->confirm('Do you want to assign them to a specific user?', true)) {
                $users = User::all();
                
                $headers = ['ID', 'Name', 'Email'];
                $rows = $users->map(function ($user) {
                    return [$user->id, $user->name, $user->email];
                })->toArray();
                
                $this->table($headers, $rows);
                
                $userId = $this->ask('Enter the ID of the user to assign plots to:');
                
                if (User::find($userId)) {
                    DB::beginTransaction();
                    try {
                        foreach ($invalidPlots as $plot) {
                            $plot->user_id = $userId;
                            $plot->save();
                        }
                        DB::commit();
                        $this->info("Successfully assigned {$invalidPlots->count()} plots to user ID {$userId}.");
                    } catch (\Exception $e) {
                        DB::rollBack();
                        $this->error("Error: {$e->getMessage()}");
                    }
                } else {
                    $this->error("User with ID {$userId} not found.");
                }
            } else if ($this->confirm('Do you want to delete these plots?', false)) {
                DB::beginTransaction();
                try {
                    foreach ($invalidPlots as $plot) {
                        $plot->delete();
                    }
                    DB::commit();
                    $this->info("Successfully deleted {$invalidPlots->count()} invalid plots.");
                } catch (\Exception $e) {
                    DB::rollBack();
                    $this->error("Error: {$e->getMessage()}");
                }
            }
        } else {
            $this->info('No plots with invalid user IDs found.');
        }
        
        // Check if there are plots with the wrong user ID
        $this->info('Checking for plots with incorrect user ownership...');
        
        $userIds = User::pluck('id');
        $this->info("Found {$userIds->count()} users in the system.");
        
        foreach ($userIds as $userId) {
            $plotsCount = SavedPlot::where('user_id', $userId)->count();
            $this->line("User ID {$userId} has {$plotsCount} plots.");
        }
        
        if ($this->confirm('Do you want to reset ownership of all plots to specific users?', false)) {
            $reset = $this->choice(
                'How do you want to reset ownership?',
                ['Assign each user their own plots only', 'Clear all plots', 'Assign all plots to a specific user'],
                0
            );
            
            if ($reset === 'Clear all plots') {
                if ($this->confirm('This will DELETE ALL PLOTS. Are you sure?', false)) {
                    DB::table('saved_plots')->delete();
                    $this->info('All plots have been deleted.');
                }
            } else if ($reset === 'Assign all plots to a specific user') {
                $userId = $this->ask('Enter user ID to assign all plots to:');
                
                if (User::find($userId)) {
                    DB::table('saved_plots')->update(['user_id' => $userId]);
                    $this->info("All plots assigned to user ID {$userId}.");
                } else {
                    $this->error("User with ID {$userId} not found.");
                }
            }
        }
        
        $this->info('Plot ownership check completed.');
        
        return Command::SUCCESS;
    }
} 