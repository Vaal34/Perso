"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import LoginButton from "@/components/navbar/loginButton";
import { NavUser } from "@/components/navbar/navUser";
import { NavItem } from "@/components/navbar/navItem";
import { NavAdd } from "@/components/navbar/navAdd";
import { getCategory } from "@/lib/bdd_orm/categoryServices";
import { Category, Task } from "@prisma/client";
import { getTask } from "@/lib/bdd_orm/tasksService";

export default function AppSidebar() {
  const { data: session, status } = useSession();
  const [dataCategory, setDataCategory] = useState<Category[]>([]);
  const [dataTask, setDataTask] = useState<Task[]>([]);

  const fetchData = async () => {
    if (status === "authenticated" && session?.user.id) {
      const categories = await getCategory(session.user.id);
      const tasks = await getTask(session.user.id);
      setDataTask(tasks);
      setDataCategory(categories);
    }
  };

  useEffect(() => {
    fetchData();
  }, [status, session]);

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <NavItem category={dataCategory} tasks={dataTask} />
        <SidebarSeparator />
        <NavAdd onDataAdded={fetchData} />
      </SidebarContent>
      <SidebarFooter>
        {status === "authenticated" ? (
          <NavUser user={session.user} />
        ) : (

          <LoginButton />
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
