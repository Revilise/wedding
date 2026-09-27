# AGENTS.md

You are an expert in JavaScript, Rsbuild, and web application development. You write maintainable, performant, and accessible code.

## Commands

- `npm run dev` - Start the dev server
- `npm run build` - Build the app for production
- `npm run preview` - Preview the production build locally

## Docs

- Rsbuild: https://rsbuild.rs/llms.txt
- Rspack: https://rspack.rs/llms.txt

## Tools

### ESLint

- Run `npm run lint` to lint your code

### Prettier

- Run `npm run format` to format your code


### Architecture

Use FSD best practices. Structure of each slice:

`<slice>`
- api/
  - handlers.ts (msw handlers)
  - mock.ts(x) (mocks for handlers)
- config/
  - types.ts (component props types at least)
  - const.ts (optional)
  - ctx.ts (optional, if you use react context provider keep context here)
  - index.ts (export types, const and ctx)
- model/ --- optional
  - index.ts or hook.ts --- module of component logic. Use this file instead of keeping logic in ui.
- ui/  --- USE FOLLOWING RULES FOR UI NAMING
  - <slice>.tsx (for example `Slider`)
  - <slice><children>.tsx (for example `SliderSlide`, optional) 
  - <slice><another-children>.tsx (for example `SliderNavigation`, optional) - you can create any children of main ui component. Use this pattern for complex ui components.
- <slice>.pcss - slice stylesheet
- index.tsx - export ui, model

### Styles

Describe styles in <slide>.postcss files.

Rules of stylesheet based on BEM:

```pcss
.<slice> {
    --sliceProperty: value;
    --slicePropertyCur: var(--sliceProperty);
    --slicePropertyHover: hover-value;
    
    --sliceElementProperty: value;
    
    any-property: var(--slidePropertyCur);
    
    &__element { // any child element of slice
        property: var(--sliceElementProperty);
    }
    
   &.isHover,
   &:hover { // describe all states the same way, including `active`
      --slicePropertyCur: var(--slicePropertyHover);
   }
    
    &--is<ModificatorName> {
        --sliceProperty: another-value;
        --slicePropertyHover: another-hover-value;
   }

}
```