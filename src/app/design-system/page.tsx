"use client";

import * as React from "react";
import {
  Plus,
  Trash2,
  Play,
  Search,
  Sparkles,
  MoreVertical,
  CheckCircle2,
  FileText,
} from "lucide-react";
import { Button, IconButton } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { FormField } from "@/components/ui/form-field";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { PageHeader, SectionHeader } from "@/components/ui/page-header";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Dialog, DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { Tooltip } from "@/components/ui/tooltip";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Skeleton, SkeletonCard } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { EmptyState } from "@/components/ui/empty-state";
import { ErrorState } from "@/components/ui/error-state";
import { useToast } from "@/hooks/use-toast";
import { PageContainer } from "@/components/shared/page-container";

export default function DesignSystemPage() {
  const { addToast } = useToast();
  const [switchChecked, setSwitchChecked] = React.useState(true);
  const [checkboxChecked, setCheckboxChecked] = React.useState(true);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = React.useState(false);

  return (
    <PageContainer className="py-10 space-y-12">
      <PageHeader
        title="PromptPilot Design System Showcase"
        description="Interactive reference showcase for PromptPilot visual tokens, accessible UI primitives, form controls, overlay patterns, and status indicators."
        badge={<Badge variant="default">Phase 2 Active</Badge>}
        actions={
          <Button
            variant="primary"
            onClick={() =>
              addToast({
                title: "Design System Loaded",
                description: "All reusable primitives are operational.",
                type: "success",
              })
            }
            leftIcon={<Sparkles className="h-4 w-4" />}
          >
            Trigger Toast
          </Button>
        }
      />

      {/* Buttons & IconButtons */}
      <section className="space-y-4">
        <SectionHeader
          title="Buttons & IconButtons"
          description="Primary, secondary, outline, ghost, and destructive variants in sm, md, and lg sizes."
        />
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="primary" leftIcon={<Plus className="h-4 w-4" />}>
            Create Prompt
          </Button>
          <Button variant="secondary" leftIcon={<Play className="h-4 w-4 text-indigo-600" />}>
            Run Playground
          </Button>
          <Button variant="outline">View History</Button>
          <Button variant="ghost">Cancel</Button>
          <Button variant="destructive" leftIcon={<Trash2 className="h-4 w-4" />}>
            Delete Prompt
          </Button>
          <Button variant="primary" isLoading>
            Simulating Run
          </Button>
          <Button variant="outline" disabled>
            Disabled Button
          </Button>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <IconButton variant="outline" aria-label="Search">
            <Search className="h-4 w-4" />
          </IconButton>
          <IconButton variant="primary" aria-label="Add new">
            <Plus className="h-4 w-4" />
          </IconButton>
          <IconButton variant="destructive" aria-label="Delete item">
            <Trash2 className="h-4 w-4" />
          </IconButton>
          <IconButton variant="ghost" aria-label="Options">
            <MoreVertical className="h-4 w-4" />
          </IconButton>
          <IconButton variant="outline" isLoading aria-label="Loading action">
            <Search className="h-4 w-4" />
          </IconButton>
        </div>
      </section>

      {/* Form Controls */}
      <section className="space-y-4">
        <SectionHeader
          title="Form Controls & Inputs"
          description="Inputs, Textarea, Select, Checkbox, and Switch wrapped with FormField label helpers."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
          <FormField label="Prompt Title" required helperText="Enter a clear descriptive title (3-80 chars)">
            <Input placeholder="e.g. Pull Request Reviewer" defaultValue="Pull Request Reviewer" />
          </FormField>

          <FormField label="Search Prompts" htmlFor="search-input">
            <Input
              id="search-input"
              placeholder="Search by keyword, tag, or variable..."
              leftElement={<Search className="h-4 w-4" />}
            />
          </FormField>

          <FormField label="Invalid Field Example" error="Title must be at least 3 characters long">
            <Input isInvalid defaultValue="PR" />
          </FormField>

          <FormField label="Target AI Model" required>
            <Select
              options={[
                { label: "Claude 3.7 Sonnet Demo", value: "claude-sonnet" },
                { label: "GPT-4.1 Demo", value: "gpt-4" },
                { label: "Gemini 2.5 Pro Demo", value: "gemini-pro" },
              ]}
            />
          </FormField>

          <div className="md:col-span-2">
            <FormField label="Prompt Content" required helperText="Use {{variable_name}} tokens for dynamic variables">
              <Textarea
                rows={4}
                defaultValue={`Act as a principal software engineer. Review the code change in {{language}}.\n\nCode Diff:\n{{code_snippet}}`}
              />
            </FormField>
          </div>

          <div className="space-y-4 pt-2">
            <Checkbox
              label="Save to Favorites"
              description="Keep this prompt pinned in your workspace favorites bar."
              checked={checkboxChecked}
              onChange={(e) => setCheckboxChecked(e.target.checked)}
            />
            <Checkbox label="Disabled option" description="This option is currently inactive" disabled />
          </div>

          <div className="space-y-4 pt-2">
            <Switch
              label="Deterministic Mock Mode"
              description="Returns reproducible test outputs without network latency."
              checked={switchChecked}
              onCheckedChange={setSwitchChecked}
            />
            <Switch label="Disabled Switch" checked={false} onCheckedChange={() => {}} disabled />
          </div>
        </div>
      </section>

      {/* Badges, Avatars & Cards */}
      <section className="space-y-4">
        <SectionHeader
          title="Badges, Avatars & Cards"
          description="Status indicators, user profile avatars, and content card containers."
        />
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="default">Default Indigo</Badge>
          <Badge variant="secondary">Secondary Slate</Badge>
          <Badge variant="success">Active (Score 9.4)</Badge>
          <Badge variant="warning">Draft Mode</Badge>
          <Badge variant="destructive">Run Failed</Badge>
          <Badge variant="outline">Tag: #engineering</Badge>
        </div>

        <div className="flex items-center gap-4 py-2">
          <Avatar name="Alex Rivera" size="sm" />
          <Avatar name="Alex Rivera" size="md" />
          <Avatar name="Alex Rivera" size="lg" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge variant="success">Active</Badge>
                <span className="text-2xs text-slate-400">Score 9.4</span>
              </div>
              <CardTitle className="mt-2">Pull Request Reviewer</CardTitle>
              <CardDescription>Systematic code review assistant focusing on security & performance.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100 font-mono">
                Variables: <code>language</code>, <code>code_snippet</code>
              </div>
            </CardContent>
            <CardFooter className="justify-between">
              <span className="text-2xs text-slate-500">Updated 2 days ago</span>
              <Button variant="outline" size="sm">
                Open Detail
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge variant="default">GPT-4.1 Demo</Badge>
                <span className="text-2xs text-slate-400">142 runs</span>
              </div>
              <CardTitle className="mt-2">Landing Page Copy Improver</CardTitle>
              <CardDescription>Transforms technical feature specs into high-converting copy.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100 font-mono">
                Variables: <code>product_name</code>, <code>draft_copy</code>
              </div>
            </CardContent>
            <CardFooter className="justify-between">
              <span className="text-2xs text-slate-500">Updated yesterday</span>
              <Button variant="primary" size="sm">
                Test in Playground
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* Tabs, Dropdown Menu & Tooltip */}
      <section className="space-y-4">
        <SectionHeader
          title="Interactive Tabs, Dropdown & Tooltips"
          description="Tabbed navigation controls, dropdown actions menu, and accessible tooltip hints."
        />
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-6">
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="content">Prompt Content</TabsTrigger>
              <TabsTrigger value="variables">Variables (3)</TabsTrigger>
              <TabsTrigger value="history">Test History</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-700">
              Overview tab content showing prompt metadata, usage metrics, and category tags.
            </TabsContent>
            <TabsContent value="content" className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-700 font-mono">
              Prompt template content preview.
            </TabsContent>
            <TabsContent value="variables" className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-700">
              Detected variable configuration list.
            </TabsContent>
            <TabsContent value="history" className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-700">
              Historical benchmark runs table.
            </TabsContent>
          </Tabs>

          <div className="flex items-center gap-6 pt-4 border-t border-slate-100">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" rightIcon={<MoreVertical className="h-4 w-4" />}>
                  Prompt Actions
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => addToast({ title: "Prompt Opened", type: "info" })}>
                  <FileText className="h-4 w-4" /> View Details
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => addToast({ title: "Prompt Duplicated", type: "success" })}>
                  <Plus className="h-4 w-4" /> Duplicate Prompt
                </DropdownMenuItem>
                <DropdownMenuItem destructive onClick={() => setIsConfirmOpen(true)}>
                  <Trash2 className="h-4 w-4" /> Delete Prompt
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Tooltip content="Copy raw prompt text to clipboard" side="top">
              <Button variant="secondary" size="sm">
                Hover for Tooltip
              </Button>
            </Tooltip>

            <Button variant="primary" size="sm" onClick={() => setIsDialogOpen(true)}>
              Open Dialog Modal
            </Button>
          </div>
        </div>
      </section>

      {/* Table Primitives */}
      <section className="space-y-4">
        <SectionHeader
          title="Data Table Primitives"
          description="Accessible data table displaying prompt runs, models, durations, and scores."
        />
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Prompt Title</TableHead>
              <TableHead>Target Model</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-semibold text-slate-900">Pull Request Reviewer</TableCell>
              <TableCell>Claude 3.7 Sonnet Demo</TableCell>
              <TableCell className="font-mono text-slate-500">1420ms</TableCell>
              <TableCell>
                <Badge variant="success">Success</Badge>
              </TableCell>
              <TableCell className="font-semibold text-emerald-600">9.4 / 10</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-semibold text-slate-900">Landing Page Copy Improver</TableCell>
              <TableCell>GPT-4.1 Demo</TableCell>
              <TableCell className="font-mono text-slate-500">1180ms</TableCell>
              <TableCell>
                <Badge variant="success">Success</Badge>
              </TableCell>
              <TableCell className="font-semibold text-emerald-600">9.2 / 10</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-semibold text-slate-900">System Architecture Advisor</TableCell>
              <TableCell>Local Model Demo</TableCell>
              <TableCell className="font-mono text-slate-500">3500ms</TableCell>
              <TableCell>
                <Badge variant="destructive">Failed</Badge>
              </TableCell>
              <TableCell className="font-semibold text-rose-600">4.5 / 10</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </section>

      {/* Loading, Empty & Error Feedback */}
      <section className="space-y-4">
        <SectionHeader
          title="Feedback States & Skeletons"
          description="Spinners, animated pulsing skeletons, empty state panels, and error display panels."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <EmptyState
            title="No prompts found in this category"
            description="Create your first prompt or select a different category to display saved templates."
            action={
              <Button variant="primary" size="sm" leftIcon={<Plus className="h-4 w-4" />}>
                Create New Prompt
              </Button>
            }
          />
          <ErrorState
            title="Failed to parse variable metadata"
            message="Prompt template token on line 4 is missing closing brackets }}."
            onRetry={() => addToast({ title: "Retrying parser...", type: "info" })}
          />
        </div>

        <div className="space-y-4 pt-4">
          <div className="flex items-center gap-3">
            <Spinner size="sm" />
            <Spinner size="md" />
            <Spinner size="lg" />
            <span className="text-xs text-slate-500">Pulsing Skeletons below:</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SkeletonCard />
            <div className="p-6 bg-white border border-slate-200 rounded-2xl space-y-3">
              <Skeleton className="h-5 w-1/2" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
            </div>
          </div>
        </div>
      </section>

      {/* Dialog Modals */}
      <Dialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogHeader
          title="Sample Dialog Overlay"
          description="Reusable modal dialog component with keyboard focus trap, Escape key listener, and backdrop overlay."
          onClose={() => setIsDialogOpen(false)}
        />
        <div className="py-4 space-y-3">
          <p className="text-xs text-slate-600 leading-relaxed">
            This dialog is accessible and responsive across mobile and desktop devices.
          </p>
          <FormField label="Dialog Input Example">
            <Input placeholder="Enter prompt tag..." defaultValue="#engineering" />
          </FormField>
        </div>
        <DialogFooter>
          <Button variant="outline" size="sm" onClick={() => setIsDialogOpen(false)}>
            Close
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              addToast({ title: "Saved Changes", type: "success" });
              setIsDialogOpen(false);
            }}
          >
            Save Changes
          </Button>
        </DialogFooter>
      </Dialog>

      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={() =>
          addToast({
            title: "Prompt Deleted",
            description: "The demo prompt was safely removed.",
            type: "error",
          })
        }
        title="Delete Prompt?"
        description="Are you sure you want to delete 'Pull Request Reviewer'? This action cannot be undone."
        confirmLabel="Delete Prompt"
        variant="destructive"
      />
    </PageContainer>
  );
}
