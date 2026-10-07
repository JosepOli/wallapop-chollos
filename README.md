# Chollos de Wallapop

App móvil que busca anuncios recientes en Wallapop y los ordena por lo baratos que están respecto a la **mediana de esa misma búsqueda**. Un −30 % significa que ese anuncio cuesta un 30 % menos que el precio típico de lo que has buscado.

## Cómo funciona
- La búsqueda se hace en el servidor (Server Component) contra la API pública que usa la web de Wallapop, con caché de 5 minutos.
- El cálculo del chollo es una función pura (`src/lib/deals.ts`) con tests: descarta precios a 0 € y cebos por debajo del 10 % de la mediana.
- Los filtros (solo con envío, ocultar reservados) se aplican en el cliente sin volver a pedir datos.
- La búsqueda se lanza sola al dejar de escribir (debounce en `useEffect` con cleanup) o con el botón.

## Arrancar
```bash
npm install
npm run dev     # http://localhost:3000
npm test
```

> La API de Wallapop no está documentada y puede cambiar. Proyecto personal sin afiliación con Wallapop.
