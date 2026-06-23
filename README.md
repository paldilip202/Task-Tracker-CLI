# Task Tracker CLI

A simple command-line interface (CLI) application to track and manage your tasks — built with plain Node.js, no external libraries or frameworks.

## Features

- Add, update, and delete tasks
- Mark a task as `in-progress` or `done`
- List all tasks
- List tasks filtered by status (`done`, `todo`, `in-progress`)
- Tasks are persisted to a local JSON file (`tasks.json`)

## Requirements

- [Node.js](https://nodejs.org/) (no other dependencies — uses only Node's built-in `fs` module)

## Installation

```bash
git clone <your-repo-url>
cd task-tracker-cli
```

No `npm install` needed — this project intentionally uses zero external packages.

## Usage

Run commands using `node cli.js <command> <arguments>`.

### Add a task

```bash
node cli.js add "Buy groceries"
# Output: Task added successfully (ID: 1)
```

### Update a task

```bash
node cli.js update 1 "Buy groceries and cook dinner"
# Output: Task 1 updated successfully
```

### Delete a task

```bash
node cli.js delete 1
# Output: Task 1 deleted successfully
```

### Mark a task as in-progress or done

```bash
node cli.js mark-in-progress 1
node cli.js mark-done 1
```

### List tasks

```bash
node cli.js list              # all tasks
node cli.js list done         # only completed tasks
node cli.js list todo         # only not-started tasks
node cli.js list in-progress  # only in-progress tasks
```

## Task Properties

Each task stored in `tasks.json` has the following shape:

| Property      | Type   | Description                                  |
|----------------|--------|-----------------------------------------------|
| `id`           | number | Unique identifier, auto-incremented           |
| `description`  | string | Short description of the task                |
| `status`       | string | One of `todo`, `in-progress`, `done`          |
| `createdAt`    | string | ISO timestamp set when the task is created    |
| `updatedAt`    | string | ISO timestamp updated on any modification     |

## Project Structure

```
.
├── cli.js          # Entry point — parses argv, dispatches commands, prints output
├── taskService.js  # Business logic — add/update/delete/mark/list, validation, IDs, timestamps
├── taskStore.js     # File I/O — reads/writes tasks.json, handles missing/empty/corrupted file cases
└── tasks.json       # Auto-created on first run — stores all tasks
```

This is a deliberate 3-layer separation:
- **`cli.js`** only knows about parsing arguments and printing results — it has no idea how tasks are stored or validated.
- **`taskService.js`** contains all business rules (valid statuses, ID generation, timestamp updates) and has no idea it's being called from a CLI — it could be reused behind a web API with no changes.
- **`taskStore.js`** is the only file that touches the filesystem or JSON parsing directly.

## Error Handling

- If `tasks.json` doesn't exist yet, it's treated as an empty task list (no crash).
- If `tasks.json` exists but is empty, it's also treated as an empty list.
- If `tasks.json` exists but contains corrupted/invalid JSON, the program reports the error and exits **without overwriting the file**, to avoid silently destroying existing data.
- Commands referencing a non-existent task ID (`update`, `delete`, `mark-in-progress`, `mark-done`) return a clear error message instead of crashing.

## Design Notes

- **IDs are never reused.** Deleting a task doesn't free up its ID for reuse — the next task always gets `(highest existing id) + 1`, to avoid ambiguous references to deleted tasks.
- **Status values have a single source of truth** (`VALID_STATUSES` in `taskService.js`), referenced by both the `mark` and `list` filter logic, rather than being hardcoded in multiple places.

## License

MIT
