'use client';

import { useEffect, useState } from 'react';
import useAgentStore, { type AgentFormData } from '@/lib/agent-store';
import { LANGUAGE_OPTIONS, VOICE_MODELS, VOICE_OPTIONS } from '@/lib/constants';
import type { AgentStatus } from '@/lib/types';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const defaultForm: AgentFormData = {
  name: '',
  description: '',
  model: VOICE_MODELS[0],
  instructions: '',
  voice: VOICE_OPTIONS[0],
  language: LANGUAGE_OPTIONS[0],
  status: 'Draft',
};

export default function AgentFormModal() {
  const isFormOpen = useAgentStore((state) => state.isFormOpen);
  const editingAgentId = useAgentStore((state) => state.editingAgentId);
  const agents = useAgentStore((state) => state.agents);
  const closeForm = useAgentStore((state) => state.closeForm);
  const addAgent = useAgentStore((state) => state.addAgent);
  const updateAgent = useAgentStore((state) => state.updateAgent);

  const [form, setForm] = useState<AgentFormData>(defaultForm);

  useEffect(() => {
    if (!isFormOpen) {
      setForm(defaultForm);
      return;
    }

    if (editingAgentId) {
      const agent = agents.find((item) => item.id === editingAgentId);
      if (agent) {
        setForm({
          name: agent.name,
          description: agent.description,
          model: agent.model,
          instructions: agent.instructions,
          voice: agent.voice,
          language: agent.language,
          status: agent.status,
        });
      }
    } else {
      setForm(defaultForm);
    }
  }, [agents, editingAgentId, isFormOpen]);

  if (!isFormOpen) return null;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!form.name.trim()) return;

    if (editingAgentId) {
      updateAgent(editingAgentId, form);
    } else {
      addAgent(form);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <div>
            <p className="text-sm text-slate-500">{editingAgentId ? 'Edit agent' : 'Create agent'}</p>
            <h3 className="text-xl font-semibold text-slate-900">
              {editingAgentId ? 'Update AI voice agent' : 'New AI voice agent'}
            </h3>
          </div>
          <button
            type="button"
            onClick={closeForm}
            className="rounded-xl border border-slate-200 p-2 text-slate-600 hover:bg-slate-50"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-slate-700">Agent name</span>
              <input
                value={form.name}
                onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
                placeholder="Support Desk"
                required
              />
            </label>

            <label className="block">
              <span className="mb-1 block text-sm font-medium text-slate-700">Model</span>
              <select
                value={form.model}
                onChange={(event) => setForm((prev) => ({ ...prev, model: event.target.value }))}
                className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
              >
                {VOICE_MODELS.map((model) => (
                  <option key={model} value={model}>
                    {model}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label className="block">
            <span className="mb-1 block text-sm font-medium text-slate-700">Description</span>
            <input
              value={form.description}
              onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
              className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
              placeholder="What this agent handles"
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-sm font-medium text-slate-700">Instructions</span>
            <textarea
              value={form.instructions}
              onChange={(event) => setForm((prev) => ({ ...prev, instructions: event.target.value }))}
              className="min-h-28 w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
              placeholder="System prompt and behavior guidelines"
            />
          </label>

          <div className="grid gap-4 md:grid-cols-3">
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-slate-700">Voice</span>
              <select
                value={form.voice}
                onChange={(event) => setForm((prev) => ({ ...prev, voice: event.target.value }))}
                className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
              >
                {VOICE_OPTIONS.map((voice) => (
                  <option key={voice} value={voice}>
                    {voice}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-1 block text-sm font-medium text-slate-700">Language</span>
              <select
                value={form.language}
                onChange={(event) => setForm((prev) => ({ ...prev, language: event.target.value }))}
                className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
              >
                {LANGUAGE_OPTIONS.map((language) => (
                  <option key={language} value={language}>
                    {language}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-1 block text-sm font-medium text-slate-700">Status</span>
              <select
                value={form.status}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, status: event.target.value as AgentStatus }))
                }
                className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
              >
                {(['Draft', 'Running', 'Live', 'Optimizing', 'Paused'] as AgentStatus[]).map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={closeForm}>
              Cancel
            </Button>
            <Button type="submit">{editingAgentId ? 'Save changes' : 'Create agent'}</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
