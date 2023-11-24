## Issue Tracker Plugin for Obsidian

**Compatibility:** Compatible with the latest version of Obsidian

### Description

The "Issue Tracker" plugin for Obsidian is a tool designed for developers and anyone who want link issues directly within their Obsidian notes. This plugin allows users to create custom issue tracking patterns, transforming references in text into actionable links, streamlining the process of managing tasks, bugs.

### Features

- **Custom Issue Track Patterns**: Create multiple patterns to identify and track various types of issues, tasks, or references within your notes.
- **Pattern Creation Form**: A user-friendly form to define each issue track pattern, tailored to your specific needs.
    - **Name**: Assign a unique name to each pattern for easy identification.
    - **Parsing Regular Expression**: Define custom regular expressions to accurately identify references or keywords in your notes.
    - **Result URL**: Set a URL for each pattern, with the ability to access matched groups from the regular expression using $1, $2, etc., allowing for dynamic link creation.
    - **Test Message**: Test how the regular expression works in real-time, ensuring accuracy and effectiveness before applying it to your notes.
- **Dynamic Document Parsing**: The plugin reads the currently opened document and applies the user-defined issue track patterns, converting specified patterns into clickable links using the defined Result URL.
- **Seamless Integration**: Works natively within Obsidian, maintaining the look and feel of the environment while adding powerful issue tracking capabilities.

### Use Cases

- **Project Management**: Track project-related tasks and issues directly in your meeting notes or project plans.
- **Bug Tracking**: For software developers, easily link bug references to your bug tracking tool or GitHub issues.

### Installation

- Download the plugin from the Obsidian Community Plugins gallery.
- In Obsidian, go to `Settings` > `Community Plugins` > `Browse`, and search for "Issue Tracker."
- Click `Install` and then `Enable` the plugin.

### Configuration

- Access the plugin settings from `Settings` > `Plugins` > `Issue Tracker`.
- Use the provided form to create and manage your custom issue track patterns.

### Support and Feedback

For support, feature requests, or to provide feedback, please visit the Issue Tracker Plugin GitHub page or join the discussion on the Obsidian Community Forum.

	With Love for Obsidian Community