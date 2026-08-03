# CLAUDE.md

Guidance for Claude Code (claude.ai/code) in this repository.

## Read AGENTS.md first

**[AGENTS.md](./AGENTS.md) is the project guide** — commands, tech stack,
architecture, conventions, deployment and known gaps. It's kept tool-agnostic so
every coding agent reads the same thing, and it's the file to update when the
architecture changes.

This file holds only what's specific to Claude Code sessions.

## Working agreements

- **Type check, don't lint.** `npx tsc --noEmit` is the gate. `npm run lint` is
  broken (no flat ESLint config) and `npm run build` can't finish without a
  database — see AGENTS.md for what a genuine pass looks like.
- **Branch and PR.** Work on a `claude/<topic>` branch, push, open a PR, and let
  the Vercel preview build before merging. Don't commit to `master`.
- **Verify on production, not the preview.** Preview deployments sit behind
  Vercel SSO and can't be fetched from a sandbox; `dreamscaper.art` is public,
  so post-merge HTML checks work there.
- **Say what wasn't verified.** No browser egress in the sandbox means visual
  and interaction changes are unverified until a human looks. Flag those rather
  than implying they were checked.

## Teamwork Integration

Project is managed in Teamwork (project ID: 753246, company: Dreamscape-R).

### Plan File Sync
When entering plan mode, always sync the plan file to Teamwork as a notebook:
- **Notebook ID**: 417837 ("Development Plan — CLAUDE.md")
- **On plan creation/update**: Use `teamwork_notebooks` action `update`
  (notebookId: 417837) to sync the plan file content
- **On session start**: If the plan file is empty or missing, check the Teamwork
  notebook for the latest version
- This ensures development context is never lost between Claude Code sessions

### Task Tracking
- All development tasks are tracked in Teamwork project 753246
- When starting work on a task, move it to "In Progress" via workflow
- When completing work, mark the task complete and move to "Done"
- Create new tasks in Teamwork for any new work items discovered during
  development

### Key IDs
- **Project**: 753246
- **Plan Notebook**: 417837
- **Nick Kulavic**: 152544
- **Rachel Dinda**: 505347
- **Claude Code**: 498872
