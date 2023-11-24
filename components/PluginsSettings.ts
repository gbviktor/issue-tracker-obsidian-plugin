export interface IssueTrackerPattern {
	name: string;
	regex: string;
	url: string;
	test: string;
}

export interface PluginSettings {
	mySetting: string;
	patterns: IssueTrackerPattern[];
}

export const DEFAULT_SETTINGS: PluginSettings = {
	mySetting: 'default',
	patterns: []
}
