import 'components/MySettingTab';
import MySettingTab from 'components/MySettingTab';
import { DEFAULT_SETTINGS, IssueTrackerPattern, PluginSettings } from 'components/PluginsSettings';
import RegexMarkdownParser from 'components/RegexMarkdownParser';
import { Editor, MarkdownView, Notice, Plugin } from 'obsidian';


export default class IssueTrackerMain extends Plugin {

	settings: PluginSettings;


	async onload() {

		await this.loadSettings();

		this.addInitialIssueTracker();

		this.addCommand({
			id: 'open-sample-modal-complex',
			name: 'Open sample modal (complex)',
			checkCallback: (checking: boolean) => {
				// Conditions to check
				const markdownView = this.app.workspace.getActiveViewOfType(MarkdownView);
				if (markdownView) {
					// If checking is true, we're simply "checking" if the command can be run.
					// If checking is false, then we want to actually perform the operation.
					if (!checking) {
						// new SampleModal(this.app).open();
					}

					const document = markdownView.editor.getDoc();
					const documentToReplace = document.getValue()
					const changeDocument = this.renderIssueTrackers(this.settings.patterns, documentToReplace)
					markdownView.editor.getDoc().setValue(changeDocument)

					// This command will only show up in Command Palette when the check function returns true
					return true;
				}
			}
		});

		// This adds an editor command that can perform some operation on the current editor instance
		this.addCommand({
			id: 'issue-tracker-open-editor',
			name: 'Apply Issue Trackers',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				console.log(editor.getSelection());
				const document = editor.getDoc();
				const documentToReplace = document.getValue()
				const changeDocument = this.renderIssueTrackers(this.settings.patterns, documentToReplace)
				editor.getDoc().setValue(changeDocument)
			}
		});

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new MySettingTab(this.app, this));

		// When registering intervals, this function will automatically clear the interval when the plugin is disabled.
		this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));
	}

	addInitialIssueTracker() {
		if (this.settings.patterns?.length > 0)
			return;
		this.AddPattern(
			{
				name: "Clickup",
				regex: "(CU-)(/\d+)",
				url: "https://app.clickup.com/t/$2",
				test: "Some task with description finished CU-49827",
			}
		)
	}

	onunload() {

	}

	renderIssueTrackers(patterns: IssueTrackerPattern[], content: string) {
		let modifiedContent = content;

		try {
			patterns.forEach(pattern => {
				//apply here alle patterns from patterns like:
				const parser = new RegexMarkdownParser(pattern.regex, pattern.url);
				modifiedContent = parser.parse(modifiedContent);
			});

		} catch (e) {
			return content;
		}

		return modifiedContent;
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	SavePattern(changed: IssueTrackerPattern, index: number) {
		this.settings.patterns[index] = changed;
		this.saveSettings();
	}

	AddPattern(created: IssueTrackerPattern) {
		this.settings.patterns.push(created)
		this.saveSettings();
	}

	DeletePatter(index: number): void {
		if (index >= 0 && index < this.settings.patterns.length) {
			// Remove the pattern at the specified index
			this.settings.patterns.splice(index, 1);

			// Save the updated settings
			this.saveData(this.settings).then(() => {
				new Notice('Pattern deleted successfully.');
				// Additional code if needed, like refreshing a view or UI
			});
		} else {
			new Notice('Invalid pattern index.');
		}
	}
}

