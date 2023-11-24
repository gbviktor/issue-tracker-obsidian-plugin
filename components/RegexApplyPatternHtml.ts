

class RegexApplyPatternHtml {
    regex: RegExp;
    urlTemplate: string;

    constructor(regexPattern: string, urlTemplate: string) {
        this.regex = new RegExp(regexPattern, 'g');
        this.urlTemplate = urlTemplate;
    }

    parse(testString: string): string {
        let result = testString;

        this.regex.lastIndex = 0; // Reset lastIndex to ensure fresh search

        let match;
        while ((match = this.regex.exec(testString)) != null) {
            // Replace matched text with a Markdown link
            const matchedText = match[0];
            const url = this.generateUrl(match);
            const markdownLink = `<a href='${matchedText}'>${url}</a>`;
            result = result.replace(matchedText, markdownLink);
        }

        return result;
    }

    private generateUrl(match: RegExpExecArray): string {
        let url = this.urlTemplate;
        match.forEach((group, index) => {
            if (index === 0) return; // Skip the entire match
            url = url.replace(`$${index}`, group);
        });
        return url;
    }
}


export default RegexApplyPatternHtml;