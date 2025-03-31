import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { Link, usePage } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid } from 'lucide-react';
import AppLogo from './app-logo';
import GeneralStockForm from './general-stock-form';
import SavePlotButton from './save-plot-button';
import SavedPlotsList from './saved-plots-list';
import { usePlotData } from '@/contexts/PlotDataContext';
import { useEffect } from 'react';

// Define the NavItem interface locally if it's not properly imported
interface NavItem {
    title: string;
    url: string;
    icon?: any;
    isActive?: boolean;
}

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        url: '/dashboard',
        icon: LayoutGrid,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Github repository',
        url: 'https://github.com/levente-horvath/stock_data',
        icon: Folder,
    },
];

export function AppSidebar() {
    const { setPlotData, setCurrentUser } = usePlotData();
    const { auth } = usePage().props as any;
    
    useEffect(() => {
        // Set current user whenever auth changes
        setCurrentUser(auth?.user?.id || null);
    }, [auth?.user?.id]);
    
    return (
        <Sidebar collapsible="offcanvas" variant="floating">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
                <div className="px-4 py-4">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Stock Analysis</h3>
                    <GeneralStockForm onDataUpdate={setPlotData} />
                    <SavePlotButton />
                    <SavedPlotsList />
                </div>
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
