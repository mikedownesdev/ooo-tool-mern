import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import { fetchMyRequests } from "../services/requests";
import { BellRing, Check, Calendar as CalendarIcon, Car } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  PopoverTrigger,
  PopoverContent,
  Popover,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

export const loader = async () => {
  const { requests } = await fetchMyRequests();
  return { requests };
};

export default function Home() {
  const { requests } = useLoaderData();

  const notifications = [
    {
      title: "Your request beginning 12/01/2023 has been approved!",
      description: "1 hour ago",
    },
    {
      title: "You have a new message!",
      description: "1 hour ago",
    },
    {
      title: "Your subscription is expiring soon!",
      description: "2 hours ago",
    },
  ];

  return (
    <div className="flex mx-auto max-w-[1400px] space-x-6">
      <div className="space-y-6 w-full">
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>You have 3 unread messages.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className=" flex items-center space-x-4 rounded-md border p-4">
              <BellRing />
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">
                  Push Notifications
                </p>
                <p className="text-sm text-muted-foreground">
                  Send notifications to device.
                </p>
              </div>
              <Switch />
            </div>
            <div>
              {notifications.map((notification, index) => (
                <div
                  key={index}
                  className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                >
                  <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {notification.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {notification.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">
              <Check className="mr-2 h-4 w-4" /> Mark all as read
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Previously Filed Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-4 gap-4 text-center">
                <div className="font-bold">Start Date</div>
                <div className="font-bold">End Date</div>
                <div className="font-bold">Approving Manager</div>
                <div className="font-bold">Status</div>
              </div>
              {requests.map((request) => (
                <div className="grid grid-cols-4 gap-4 text-center">
                  <div>{request.startDate}</div>
                  <div>{request.endDate}</div>
                  <div>{request.approvingManager}</div>
                  <div>{request.status}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Requests to Approve</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-4 gap-4 text-center">
                <div className="font-bold">Start Date</div>
                <div className="font-bold">End Date</div>
                <div className="font-bold">Requesting Employee</div>
                <div className="font-bold">Status</div>
              </div>
              <div className="grid grid-cols-4 gap-4 text-center">
                <div>12/01/2023</div>
                <div>12/15/2023</div>
                <div>Jane Doe</div>
                <div className="text-yellow-500">Pending</div>
              </div>
              <div className="grid grid-cols-4 gap-4 text-center">
                <div>01/05/2024</div>
                <div>01/10/2024</div>
                <div>John Smith</div>
                <div className="text-yellow-500">Pending</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
