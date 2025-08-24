
'use client';

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { posts as initialPosts } from "@/lib/posts";
import { useState } from "react";
import { PlusCircle, MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const initialFaqs = [
    {
      question: "What are the first steps in a property dispute in India?",
      answer: "The first step is usually to gather all your property documents, like the sale deed and land records. It's often helpful to try and resolve the issue through discussion first. If that doesn't work, sending a formal legal notice is a common next step before considering going to court. Consulting a lawyer early can save you a lot of trouble."
    },
    {
      question: "How do I file for divorce in India?",
      answer: "In India, you can file for divorce in the family court of the district where you and your spouse last lived together, or where your marriage took place. You'll need to file a petition with the court, which should explain the reason for the divorce. It can be a mutual decision with your spouse or a contested one. It's a sensitive process, so getting guidance from a family lawyer is highly recommended."
    },
    {
      question: "What should I do if a product I bought is faulty?",
      answer: "As a consumer in India, you have rights. First, contact the seller or the company's customer service with your proof of purchase. If they don't resolve the issue, you can file a complaint with the District Consumer Disputes Redressal Forum. The process is designed to be user-friendly, but having a lawyer can help make your case stronger."
    },
];


export default function AdminPage() {
    const [posts, setPosts] = useState(initialPosts);
    const [faqs, setFaqs] = useState(initialFaqs);

  return (
    <div className="container mx-auto py-12">
        <header className="text-center mb-12">
            <h1 className="font-headline text-5xl font-bold md:text-7xl">Admin Panel</h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground">
                Manage your website's content here.
            </p>
        </header>

      <Tabs defaultValue="blog">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="blog">Manage Blog Posts</TabsTrigger>
          <TabsTrigger value="faq">Manage FAQs</TabsTrigger>
        </TabsList>

        <TabsContent value="blog">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Blog Posts</CardTitle>
              <CardDescription>
                Add, edit, or remove blog posts.
              </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="text-right mb-4">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button>
                                <PlusCircle className="mr-2 h-4 w-4" />
                                Add New Post
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[625px]">
                            <DialogHeader>
                                <DialogTitle>Add New Blog Post</DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="title" className="text-right">Title</Label>
                                    <Input id="title" placeholder="Blog post title" className="col-span-3" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="description" className="text-right">Description</Label>
                                    <Textarea id="description" placeholder="Short description" className="col-span-3" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="content" className="text-right">Content</Label>
                                    <Textarea id="content" placeholder="Full blog content (HTML)" className="col-span-3 min-h-[200px]" />
                                </div>
                            </div>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button type="button" variant="secondary">Cancel</Button>
                                </DialogClose>
                                <Button type="submit">Save Post</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead className="hidden md:table-cell">Date</TableHead>
                    <TableHead>
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {posts.map((post) => (
                    <TableRow key={post.slug}>
                      <TableCell className="font-medium">{post.title}</TableCell>
                      <TableCell className="hidden md:table-cell">{post.date}</TableCell>
                      <TableCell>
                      <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              aria-haspopup="true"
                              size="icon"
                              variant="ghost"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant="ghost" className="w-full justify-start px-2 py-1.5 text-sm font-normal text-red-500 hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-400">Delete</Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete this blog post.
                                    </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction>Delete</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="faq">
        <Card className="glass-card">
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>
                Add, edit, or remove FAQs from your website.
              </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="text-right mb-4">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button>
                                <PlusCircle className="mr-2 h-4 w-4" />
                                Add New FAQ
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[625px]">
                            <DialogHeader>
                                <DialogTitle>Add New FAQ</DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="question" className="text-right">Question</Label>
                                    <Textarea id="question" placeholder="The question" className="col-span-3" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="answer" className="text-right">Answer</Label>
                                    <Textarea id="answer" placeholder="The answer" className="col-span-3 min-h-[150px]" />
                                </div>
                            </div>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button type="button" variant="secondary">Cancel</Button>
                                </DialogClose>
                                <Button type="submit">Save FAQ</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Question</TableHead>
                    <TableHead>
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {faqs.map((faq, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{faq.question}</TableCell>
                      <TableCell>
                      <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              aria-haspopup="true"
                              size="icon"
                              variant="ghost"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant="ghost" className="w-full justify-start px-2 py-1.5 text-sm font-normal text-red-500 hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-400">Delete</Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete this FAQ.
                                    </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction>Delete</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
