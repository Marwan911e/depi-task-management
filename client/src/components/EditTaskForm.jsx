import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { editTaskFormSchema } from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    Loader2,
    ArrowDown,
    ArrowLeft,
    ArrowUp,
    Briefcase,
    School,
    User,
    Square,
    CheckSquare,
    TimerIcon,
} from "lucide-react";

import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFetcher } from "react-router-dom";

const EditTaskForm = ({ closeDialog, task }) => {
    const form = useForm({
        resolver: zodResolver(editTaskFormSchema),
        defaultValues: {
            title: task.title,
            status: task.status.toLowerCase(),
            priority: task.priority.toLowerCase(),
            category: task.category.toLowerCase(),
        },
    });

    const fetcher = useFetcher();
    const isAdding =
        fetcher.state === "submitting" || fetcher.state === "loading";

    useEffect(() => {
        if (fetcher.state === "idle" && fetcher.data?.ok) {
            closeDialog();
        }
    }, [fetcher]);

    const onSubmit = (values) => {
        // TODO: Api calls
        fetcher.submit(
            { action: "edit", id: task.id, ...values },
            { method: "PATCH", action: "/tasks" }
        );
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input placeholder="Todo" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Status</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Choose a status" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="todo">
                                        <Square className="w-4 inline-block mb-1 mr-1" />
                                        Todo
                                    </SelectItem>
                                    <SelectItem value="in-progress">
                                        <TimerIcon className="w-4 inline-block mb-1 mr-1" />
                                        In Progress
                                    </SelectItem>
                                    <SelectItem value="done">
                                        <CheckSquare className="w-4 inline-block mb-1 mr-1" />
                                        Done
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="priority"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Priority</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Choose a priority" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="low">
                                        <ArrowDown className="w-4 inline-block mb-1 mr-1" />
                                        Low
                                    </SelectItem>
                                    <SelectItem value="medium">
                                        <ArrowLeft className="w-4 inline-block mb-1 mr-1" />
                                        Medium
                                    </SelectItem>
                                    <SelectItem value="high">
                                        <ArrowUp className="w-4 inline-block mb-1 mr-1" />
                                        High
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Category</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Choose a category" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="personal">
                                        <User className="w-4 inline-block mb-1 mr-1" />
                                        Personal
                                    </SelectItem>
                                    <SelectItem value="school">
                                        <School className="w-4 inline-block mb-1 mr-1" />
                                        School
                                    </SelectItem>
                                    <SelectItem value="work">
                                        <Briefcase className="w-4 inline-block mb-1 mr-1" />
                                        Work
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button disabled={isAdding} className="w-full" type="submit">
                    {isAdding && <Loader2 className="w-4 mr-2 animate-spin" />}
                    Update Task
                </Button>
            </form>
        </Form>
    );
};

export default EditTaskForm;
