import { IssueTrackerPattern } from "components/PluginsSettings";
import { Notice, SuggestModal } from "obsidian";

export const ALL_PATTERN_PRESETS = [

] as IssueTrackerPattern[];


export class PatternsSuggestionModal extends SuggestModal<IssueTrackerPattern> {
    // Returns all available suggestions.
    getSuggestions(query: string): IssueTrackerPattern[] {
        return ALL_PATTERN_PRESETS.filter((item) =>
            item.name.toLowerCase().includes(query.toLowerCase())
        );
    }

    // Renders each suggestion item.
    renderSuggestion(item: IssueTrackerPattern, el: HTMLElement) {
        el.createEl("div", { text: item.name });
        // el.createEl("small", { text: item.author });
    }

    // Perform action on the selected suggestion.
    onChooseSuggestion(item: IssueTrackerPattern, evt: MouseEvent | KeyboardEvent) {
        new Notice(`Selected ${item.name}`);
    }
}