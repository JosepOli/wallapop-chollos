# CLAUDE.md — wallapop-chollos

> TODO(Josep): sustituir esta lista por las 10 reglas literales del post de F. Javier Pedrosa.

## Reglas de trabajo
1. **Planifica antes de programar.** Propón un plan corto y espera confirmación antes de tocar código.
2. **Pregunta antes de suponer.** Si algo es ambiguo, pregunta; no inventes requisitos.
3. **No refactorices lo que no se ha pedido.** Cambios mínimos y acotados a la tarea.
4. **SOLID.** Una responsabilidad por módulo; la lógica de negocio (`src/lib/deals.ts`) no depende de la API ni de React.
5. **Nada de comentarios basura.** Solo comentarios que expliquen el *porqué*, nunca el *qué*.
6. **Git bajo control humano.** No hagas commit, push ni merge sin que te lo pida.

## Proyecto
- Next.js 15 (App Router), React 19, TypeScript estricto, Tailwind 4, Vitest.
- `src/lib/wallapop.ts`: cliente de la API de búsqueda (solo servidor, `server-only`).
- `src/lib/deals.ts`: dominio puro (mediana y ranking de chollos), con tests.
- `src/components/*`: UI. Client components solo donde hay estado o eventos.

## Calidad mínima antes de dar algo por hecho
- `npm test`, `npm run lint` y `npm run build` en verde.
- UX móvil: zonas táctiles ≥ 44 px, inputs ≥ 16 px, sin scroll horizontal, protección de doble toque.
