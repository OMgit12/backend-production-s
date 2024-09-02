module.exports = {
    extends: ["@commitlint/cli", "@commitlint/config-conventional"],  
    rules: {
        "type-enum":[
            2,
            "always",
            [
                "feat",
                "fix",
                "docs",
                "style",
                "refector",
                "pref",
                "test",
                "build",
                "ci",
                "chore",
                "revert"
            ]
        ],
        "subject-case":[2, "always", "sentence-case"]
    }
}