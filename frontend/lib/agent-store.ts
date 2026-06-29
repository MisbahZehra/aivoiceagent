import { create } from 'zustand';
import { initialAgents } from './mock-data';
import type { Agent, AgentStatus } from './types';

export interface AgentFormData {
  name: string;
  description: string;
  model: string;
  instructions: string;
  voice: string;
  language: string;
  status: AgentStatus;
}

interface AgentState {
  agents: Agent[];
  selectedAgentId: string | null;
  isFormOpen: boolean;
  editingAgentId: string | null;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectAgent: (id: string | null) => void;
  openCreateForm: () => void;
  openEditForm: (id: string) => void;
  closeForm: () => void;
  addAgent: (data: AgentFormData) => void;
  updateAgent: (id: string, data: AgentFormData) => void;
  deleteAgent: (id: string) => void;
  toggleAgentActive: (id: string) => void;
  getFilteredAgents: () => Agent[];
  getSelectedAgent: () => Agent | undefined;
}

const createAgentId = () => `agent-${Date.now()}`;

const useAgentStore = create<AgentState>((set, get) => ({
  agents: initialAgents,
  selectedAgentId: initialAgents[0]?.id ?? null,
  isFormOpen: false,
  editingAgentId: null,
  searchQuery: '',

  setSearchQuery: (query) => set({ searchQuery: query }),

  selectAgent: (id) => set({ selectedAgentId: id }),

  openCreateForm: () => set({ isFormOpen: true, editingAgentId: null }),

  openEditForm: (id) => set({ isFormOpen: true, editingAgentId: id }),

  closeForm: () => set({ isFormOpen: false, editingAgentId: null }),

  addAgent: (data) => {
    const newAgent: Agent = {
      id: createAgentId(),
      ...data,
      calls: 0,
      isActive: true,
      createdAt: new Date().toISOString(),
    };
    set((state) => ({
      agents: [newAgent, ...state.agents],
      selectedAgentId: newAgent.id,
      isFormOpen: false,
      editingAgentId: null,
    }));
  },

  updateAgent: (id, data) => {
    set((state) => ({
      agents: state.agents.map((agent) =>
        agent.id === id ? { ...agent, ...data } : agent,
      ),
      isFormOpen: false,
      editingAgentId: null,
    }));
  },

  deleteAgent: (id) => {
    set((state) => {
      const remaining = state.agents.filter((agent) => agent.id !== id);
      return {
        agents: remaining,
        selectedAgentId:
          state.selectedAgentId === id ? remaining[0]?.id ?? null : state.selectedAgentId,
      };
    });
  },

  toggleAgentActive: (id) => {
    set((state) => ({
      agents: state.agents.map((agent) =>
        agent.id === id
          ? {
              ...agent,
              isActive: !agent.isActive,
              status: !agent.isActive ? 'Running' : 'Paused',
            }
          : agent,
      ),
    }));
  },

  getFilteredAgents: () => {
    const { agents, searchQuery } = get();
    const query = searchQuery.trim().toLowerCase();
    if (!query) return agents;
    return agents.filter(
      (agent) =>
        agent.name.toLowerCase().includes(query) ||
        agent.model.toLowerCase().includes(query) ||
        agent.description.toLowerCase().includes(query),
    );
  },

  getSelectedAgent: () => {
    const { agents, selectedAgentId } = get();
    return agents.find((agent) => agent.id === selectedAgentId);
  },
}));

export default useAgentStore;
