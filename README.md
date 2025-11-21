---

This is a personal passion project born out of frustration with the "old-fashioned" way of doing things. My workplace used paper sheets for calculating hours, which left everything up to the individual. I wanted to make life easier, so I developed a simple calculator using a default SvelteKit template.

Right now, it fulfils its purpose, but I know it could be better. I had plans to implement Machine Learning to parse PDF rotas and pre-calculate hours, but I’ve decided to put that on hold. No rush is needed, and I need to prioritise my university work and my future career in C# development.

While I really want to finish this, I can't let it distract me from my academic focus. If my trajectory stays the same, I plan to pick this back up in late 2026 and migrate the whole thing to a .NET 10 Web API. Since I am becoming more proficient in C# than Node, this will make development much smoother. In the meantime, I might privately experiment with a Web API migration just to test the waters.

---

# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npx sv create

# create a new project in my-app
npx sv create my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.
