"use client";

import * as React from "react";
import { Settings, Download, Upload, Trash2, Cpu, Thermometer, Save } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { FormField } from "@/components/ui/form-field";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { usePreferences } from "@/hooks/use-preferences";
import { DEFAULT_DEMO_MODELS } from "@/lib/constants";
import { useToast } from "@/hooks/use-toast";
import { clearAllStorage } from "@/lib/storage";

export default function SettingsPage() {
  const { preferences, updatePreferences } = usePreferences();
  const { addToast } = useToast();

  const [defaultModel, setDefaultModel] = React.useState(preferences.defaultModel);
  const [temperature, setTemperature] = React.useState(preferences.defaultTemperature);
  const [itemsPerPage, setItemsPerPage] = React.useState(preferences.itemsPerPage);
  const [isClearOpen, setIsClearOpen] = React.useState(false);

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleSavePreferences = (e: React.FormEvent) => {
    e.preventDefault();
    updatePreferences({
      defaultModel,
      defaultTemperature: temperature,
      itemsPerPage: Number(itemsPerPage),
    });

    addToast({
      title: "Settings Saved",
      description: "Workspace defaults updated successfully.",
      type: "success",
    });
  };

  const handleExportWorkspace = () => {
    const backupData = {
      exportDate: new Date().toISOString(),
      storage: { ...localStorage },
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backupData, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `promptpilot-workspace-backup-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    addToast({
      title: "Workspace Exported",
      description: "Downloaded complete LocalStorage backup JSON.",
      type: "success",
    });
  };

  const handleImportWorkspace = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        if (json && json.storage) {
          Object.entries(json.storage).forEach(([k, v]) => {
            localStorage.setItem(k, v as string);
          });
          addToast({
            title: "Workspace Imported",
            description: "Restored workspace state. Reloading page...",
            type: "success",
          });
          setTimeout(() => window.location.reload(), 1000);
        }
      } catch (err) {
        addToast({
          title: "Import Error",
          description: "Invalid JSON backup file format.",
          type: "error",
        });
      }
    };
    reader.readAsText(file);
  };

  const handleClearData = () => {
    clearAllStorage();
    addToast({
      title: "Workspace Cleared",
      description: "Cleared all LocalStorage keys. Resetting to initial seed data...",
      type: "info",
    });
    setTimeout(() => window.location.reload(), 1000);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <PageHeader
        title="Workspace Preferences & Data"
        description="Configure default AI model parameters, import/export workspace backups, or reset local storage."
      />

      {/* Preferences Form */}
      <form onSubmit={handleSavePreferences} className="space-y-6 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Cpu className="h-4 w-4 text-indigo-600" /> Default Testing Execution Defaults
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Default model parameters applied when running playground tests.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="Default AI Model">
            <Select value={defaultModel} onChange={(e) => setDefaultModel(e.target.value)}>
              {DEFAULT_DEMO_MODELS.map((m) => (
                <option key={m.id} value={m.name}>
                  {m.name} ({m.provider})
                </option>
              ))}
            </Select>
          </FormField>

          <FormField label="Items Per Page">
            <Select value={itemsPerPage} onChange={(e) => setItemsPerPage(Number(e.target.value))}>
              <option value={6}>6 items</option>
              <option value={12}>12 items</option>
              <option value={24}>24 items</option>
            </Select>
          </FormField>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1 text-xs">
            <span className="font-semibold text-slate-700 flex items-center gap-1">
              <Thermometer className="h-3.5 w-3.5 text-indigo-600" /> Default Temperature
            </span>
            <span className="font-mono font-bold text-slate-900">{temperature.toFixed(2)}</span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={temperature}
            onChange={(e) => setTemperature(parseFloat(e.target.value))}
            className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
        </div>

        <div className="pt-2 flex justify-end">
          <Button variant="primary" type="submit" leftIcon={<Save className="h-4 w-4" />}>
            Save Preferences
          </Button>
        </div>
      </form>

      {/* Backup & Export Card */}
      <div className="space-y-4 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Download className="h-4 w-4 text-indigo-600" /> Backup & Data Transfer
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Export all local prompts, results, categories, and settings as a JSON file.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button variant="outline" onClick={handleExportWorkspace} leftIcon={<Download className="h-4 w-4" />}>
            Export Workspace JSON
          </Button>

          <input
            type="file"
            accept=".json"
            ref={fileInputRef}
            onChange={handleImportWorkspace}
            className="hidden"
          />
          <Button
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            leftIcon={<Upload className="h-4 w-4" />}
          >
            Import Backup JSON
          </Button>
        </div>
      </div>

      {/* Reset & Clear Card */}
      <div className="p-6 bg-rose-50 rounded-2xl border border-rose-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-rose-900">Reset Local Workspace Data</h3>
          <p className="text-xs text-rose-700 mt-0.5">
            Deletes all local storage data (`promptpilot.*`) and re-initializes seed data.
          </p>
        </div>
        <Button
          variant="destructive"
          onClick={() => setIsClearOpen(true)}
          leftIcon={<Trash2 className="h-4 w-4" />}
        >
          Clear Workspace Data
        </Button>
      </div>

      <ConfirmDialog
        isOpen={isClearOpen}
        onClose={() => setIsClearOpen(false)}
        onConfirm={handleClearData}
        title="Clear All Local Workspace Data?"
        description="Are you sure you want to delete all local storage data? This action will reset all prompts, results, and settings back to initial defaults."
        confirmLabel="Yes, Clear All Data"
        variant="destructive"
      />
    </div>
  );
}
