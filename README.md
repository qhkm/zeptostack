# ZeptoStack

A lightweight, secure, local-first stack for running autonomous agents reliably.

**Live site:** https://zeptostack.com

## The Problem

Most agent and workflow platforms were designed for server-centric automation — large cloud deployments, heavy runtimes, centralized orchestration.

But the next wave of AI isn't only larger models in the cloud. It's smaller, more reliable autonomous systems running **close to where work actually happens** — on laptops, gateways, edge devices, and near real machines.

These systems need a different kind of infrastructure: lightweight processes, durable execution, replay and recovery, configurable isolation, and orchestration that works locally.

## The Vision

ZeptoStack is an operating stack for autonomous agents. Not a framework for building chatbots — a foundation for running agents as real software processes.

**From personal agents to autonomous operations:**

1. **Personal Agents** — On laptops and workstations
2. **Edge & IoT** — On gateways and devices
3. **Local Infrastructure** — Near machines and systems
4. **Autonomous Operations** — Self-operating systems

## The Stack

Five layers, each solving a specific problem:

| Layer | What it does |
|-------|-------------|
| **ZeptoClaw** | Ultra-lightweight agent engine (~6MB binary). Runs agents as independent processes — hundreds in parallel without heavy framework overhead. |
| **ZeptoR8R** | Workflow automation engine. Multi-step flows, device and sensor events, tool coordination, retries and branching logic. |
| **ZeptoPM** | Agent orchestrator. Manages large collections of agents — scheduling, lifecycle, resources — turning individual agents into coordinated systems. |
| **ZeptoRT** | Durable runtime layer. Replay, recovery, effect tracking, and runtime guarantees for long-running execution that survives failures. |
| **ZeptoCapsule** | Secure execution isolation. Configurable security levels — filesystem control, network policies — depending on risk and trust requirements. |

Use them independently or together as a full deployment stack.

## Ecosystem

| Project | Description | GitHub |
|---------|-------------|--------|
| [ZeptoClaw](https://zeptoclaw.com) | Ultra-lightweight AI agent runtime (~6MB binary) | [qhkm/zeptoclaw](https://github.com/qhkm/zeptoclaw) |
| r8r | Agent-native workflow automation engine | [qhkm/r8r](https://github.com/qhkm/r8r) |
| ZeptoPM | Process manager for AI agents | [qhkm/zeptopm](https://github.com/qhkm/zeptopm) |
| ZeptoRT | Durable turn-based process runtime | [qhkm/zeptort](https://github.com/qhkm/zeptort) |
| ZeptoCapsule | Isolation sandbox for AI agents | [qhkm/zeptocapsule](https://github.com/qhkm/zeptocapsule) |

## Design Principles

- **Local-first** — Runs on your machine, not just in the cloud
- **Process-based** — Agents are lightweight OS processes, not threads in a monolith
- **Minimal** — ~6MB runtime, not hundreds of megabytes of dependencies
- **Open source** — MIT licensed, fully transparent

## License

MIT
