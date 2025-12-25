import { Comment, InvalidCommentBodyError } from "../../src/domain";

describe("Comment", () => {
  it("creates a comment with valid input", () => {
    const comment = Comment.create({
      id: "comment-1",
      taskId: "task-1",
      authorId: "user-1",
      body: "Looks good.",
      createdAt: new Date("2024-01-02")
    });

    expect(comment.getBody()).toBe("Looks good.");
  });

  it("rejects empty body", () => {
    expect(() =>
      Comment.create({
        id: "comment-1",
        taskId: "task-1",
        authorId: "user-1",
        body: " ",
        createdAt: new Date("2024-01-02")
      })
    ).toThrow(InvalidCommentBodyError);
  });
});
