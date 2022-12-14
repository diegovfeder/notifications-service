export class Content {
  private readonly content: string;

  get value() {
    return this.content;
  }

  private validateContent(content: string): boolean {
    return content.length >= 5 && content.length <= 255;
  }

  constructor(content: string) {
    const isContentValid = this.validateContent(content);

    if (!isContentValid) {
      throw new Error('Content must be between 5 and 255 characters');
    }

    this.content = content;
  }
}
