# Feature Overview

- Add projects with name, description, link, and categories.
- Contact fields: Instagram, LinkedIn, Email, WhatsApp on `projects` table.
- Filter/search projects by category options via `category_option_values` and `project_options`.
- Profile: view user-created projects.
- Admin panels for managing categories and projects.

## Data Model

- `users(uid, user_role)`
- `categories(category_id, category)`
- `category_option_values(option_id, option_name, category_id)`
- `projects(project_id, ..., contact_*)`
- `project_options(id, project_id, category_id, option_id)`
- `team_members(member_id, project_id, name, linkedin)`
