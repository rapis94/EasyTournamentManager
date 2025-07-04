## Configuración inicial
✒️ Sobre este README y el uso de IA
Este archivo fue redactado en colaboración con ChatGPT, utilizado como herramienta de asistencia para sintetizar, corregir estilo y estructurar el contenido de forma clara y profesional.

Todo el contenido, estructura técnica y decisiones de diseño del proyecto fueron desarrolladas íntegramente por Luis Alejandro Lemos Camacho. El uso de IA en este repositorio refleja una filosofía de trabajo donde las herramientas modernas potencian el proceso creativo, pero no lo reemplazan.

"Usar IA sin criterio es una debilidad. Integrarla con inteligencia, una ventaja."
— Luis A. Lemos Camacho
# 🏆 Torneos Mario Ovalle

Sistema completo para la gestión, visualización y participación en torneos competitivos de videojuegos, desarrollado íntegramente por Luis Alejandro Lemos Camacho.

## 🚀 ¿Qué es este proyecto?

Es una plataforma **Full Stack** que permite:

- Crear y administrar torneos.
- Registrar usuarios y gestionar perfiles.
- Asignar jugadores a grupos.
- Generar automáticamente enfrentamientos 1v1.
- Controlar inscripciones, verificar comprobantes de pago y mostrar duelos.
- Proveer una **web pública** visual y liviana con inscripción en línea.
- Y mucho más.

## 🧩 Tecnologías utilizadas

### 🔧 Backend

- **PHP** (Vanilla, sin frameworks)
- API REST JSON
- MySQL
- Seguridad con token de autenticación tipo JWT (manual)

### 🖥️ Frontend Administrativo

- **React + Vite**
- Bootstrap 5
- React Toastify
- Hooks personalizados (por ejemplo: `useDataManager` para paginación y estado)

### 🌐 Web Pública

- HTML + CSS (Vanilla)
- JavaScript puro (Vanilla JS)
- Bootstrap 5
- SPA con navegación gestionada desde PHP (`NAVEGADOR`)
- API remota para contenido dinámico

## 🧠 Arquitectura

- Base de datos relacional, diseñada de forma modular y expandible.
- Separación clara de responsabilidades entre la vista pública, administración y API.
- Sin dependencias externas innecesarias en el frontend público: **puro rendimiento y ligereza**.
- Código escrito progresivamente en una semana y media de desarrollo continuo, de forma iterativa y pragmática, validando sobre la marcha con usuarios reales.

## ✍️ Notas del autor

> “Este sistema fue construido desde cero, sin plantillas, sin copiar estructuras. Solo una idea clara, tiempo limitado, y mucha pasión. Todo mientras el sistema ya estaba siendo utilizado.”  
> — *Luis A. Lemos Camacho*

## Modo de uso
1. Cloná el repositorio.
2. Copiá el archivo `config.example.php` como `config.php`.
3. Completá las credenciales de base de datos y demás configuraciones necesarias.
4. Asegurate de que `config.php` está en tu `.gitignore` para evitar subirlo al repositorio.
5. Apache/Nginx deben estar configurados para permitir el uso de .htaccess

```bash
cp config.example.php config.php
````
## Licencia

Este proyecto fue desarrollado por [Luis Lemos](https://github.com/rapis94) y se publica como parte de su portfolio profesional.

Queda prohibido su uso comercial o redistribución sin autorización expresa del autor.

📩 Para más información: llc94@hotmail.es
