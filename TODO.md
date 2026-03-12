# Task: Update ProjectDetailPage.tsx for new react-hook-form hook

## TODO Steps (approved plan)

- [x] Step 1: Create this TODO.md to track progress
- [ ] Step 2: Edit ProjectDetailPage.tsx:
    - Update hook destructuring (add formValues, register, errors; remove tempProject, handleChange)
    - Wrap form content in Box component="form" onSubmit={handleSave}
    - Update all inputs to use {...register('field')}
    - Add error handling to TextFields
    - Update checkbox to register
    - Fix title display to use formValues.title in edit mode
    - Update button onClick=handleSave
    - Remove isInputDisabled references
- [ ] Step 3: Test changes:
    - yarn dev
    - Navigate to /projects/new and /projects/{id}
    - Toggle edit, validate form (empty submit), save, check dirty fields PATCH
    - Unarchive button
    - Snackbar errors
- [ ] Step 4: Create git branch blackboxai/update-project-detail-rhf, commit changes, push, create PR (user requested)
- [ ] Step 5: Update TODO with completion, attempt_completion

Current progress: Starting edits.
