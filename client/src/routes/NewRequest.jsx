import { redirect } from "react-router-dom";
import { createTimeOffRequest } from "../services/requests";

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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// TODO create functions to handle validate the form data upon user input

export async function action({ request }) {
  // TODO validate the form data upon
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const responseData = await createTimeOffRequest(data);
  const timeOffRequestId = responseData.request._id;
  return redirect(`/requests/${timeOffRequestId}`);
}

export default function NewRequest() {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>New Request</CardTitle>
          <CardDescription>
            File a new out of office request below
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="start-date">Start Date</Label>
              <Input id="start-date" required type="date" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end-date">End Date</Label>
              <Input id="end-date" required type="date" />
            </div>
            <Button className="w-full" type="submit">
              Submit Request
            </Button>
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Switch />
              <p className="text-sm font-medium leading-none">
                Send email notifications
              </p>
            </div>
            <Popover>
              <PopoverTrigger>
                <Button variant="outline">Add to Calendar</Button>
              </PopoverTrigger>
              <PopoverContent>
                <Calendar />
              </PopoverContent>
            </Popover>
          </div>
        </CardFooter>
      </Card>
    </>
  );
}
