'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Users, Settings, Shield, Activity, Menu } from 'lucide-react';

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navItems = [
    { href: '/dashboard', icon: Users, label: 'Equipe' },
    { href: '/dashboard/general', icon: Settings, label: 'Geral' },
    { href: '/dashboard/activity', icon: Activity, label: 'Atividade' },
    { href: '/dashboard/security', icon: Shield, label: 'Segurança' }
  ];

  return (
    <div className="flex flex-col min-h-[calc(100dvh-68px)] max-w-7xl mx-auto w-full bg-black">
      {/* Mobile header */}
      <div className="lg:hidden flex items-center justify-between bg-gray-900 border-b border-gray-800 p-4">
        <div className="flex items-center">
          <span className="font-medium text-white">Configurações</span>
        </div>
        <Button
          className="-mr-3"
          variant="ghost"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Alternar barra lateral</span>
        </Button>
      </div>

      <div className="flex flex-1 overflow-hidden h-full bg-black">
        {/* Sidebar */}
        <aside
          className={`w-64 bg-gray-900 lg:bg-gray-900 border-r border-gray-800 lg:block ${
            isSidebarOpen ? 'block' : 'hidden'
          } lg:relative absolute inset-y-0 left-0 z-40 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <nav className="h-full overflow-y-auto p-4">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} passHref>
                <Button
                  variant={pathname === item.href ? 'secondary' : 'ghost'}
                  className={`shadow-none my-1 w-full justify-start text-white ${
                    pathname === item.href ? 'bg-gray-800' : ''
                  }`}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Button>
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-0 lg:p-4 bg-black">{children}</main>
      </div>
    </div>
  );
}
