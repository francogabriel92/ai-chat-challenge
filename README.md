# 🧠 AI Chat App Challenge

Este proyecto es una aplicación de chat con IA construida con React y React Native, enfocada en una experiencia fluida, minimalista y rica en microinteracciones. Fue desarrollado como parte de una prueba técnica.

---

## 🚀 Cómo levantar el proyecto

1. **Cloná el repositorio**

```bash
git clone https://github.com/francogabriel92/ai-chat-challenge.git
cd ai-chat-challenge
```

2. **Instalá las dependencias**

```bash
npm install
# o
yarn install
```

3. **Levantá el proyecto en modo desarrollo**

```bash
npx expo start
```

4. **Configurar las variables de entorno**

Antes de correr la aplicación, asegurate de definir las siguientes variables de entorno en un archivo `.env` en la raíz del proyecto:

```dotenv
OPENAI_API_KEY=example-api-key
GOOGLE_APPLICATION_CREDENTIALS=/example/path/to/your/credentials.json
GOOGLE_VERTEX_LOCATION=us-central1
GOOGLE_VERTEX_PROJECT=example-project
```

### 📌 Detalles

- `OPENAI_API_KEY`: Clave privada de acceso a la API de OpenAI. Se implemento para el TTS.
- `GOOGLE_APPLICATION_CREDENTIALS`: Ruta absoluta al archivo JSON de credenciales de tu cuenta de servicio en Google Cloud.
- `GOOGLE_VERTEX_LOCATION`: Región en la que está configurado Vertex AI (por ejemplo, `us-central1`).
- `GOOGLE_VERTEX_PROJECT`: ID del proyecto de Google Cloud donde se encuentra habilitado Vertex AI.

---

## ⚙️ Versiones utilizadas

- **Node.js**: `v22.16`
- **Expo SDK**: `53`
- **React Native**: según versión incluida en Expo 53
- **React**: `19.0.0`

> El proyecto se probó en:

| Plataforma | Dispositivo              | Resultado |
| ---------- | ------------------------ | --------- |
| iOS        | iPhone SE (3rd Gen, sim) | ✅ Fluido |
| iOS        | iPhone 12 Mini (físico)  | ✅ Fluido |
| Android    | Motorola G6 (físico)     | ✅ Fluido |
| Web        | Chrome (última versión)  | ✅ Fluido |

---

## 🤖 Uso de inteligencia artificial

Se utilizó el autocompletado de Github Copilot y su chat integrado con el modelo `Claude Sonnet 4`. Más allá de la ayuda para escribir este readme a continuación se listan los prompts más relevantes, más alla de dar un contexto general del proyecto como instrucción:

- **Como se implementa un long press en React Native? En esta implementación intenté con un Pressable pero dejó de funcionar, cuál es la manera más común en proyectos productivos de abordar este problema. Dame al menos 2 opciones distintas y explicame con detalle el problema que estoy teniendo y como las soluciones propuestas lo abordan.**
  En este caso la solución que mejor se adaptó fue usar la librería `react-native-gesture-handler` que se implementó para la aparición del botón de TTS (Text-To-Speech) de la burbuja del chat. Se dio el archivo `chat-bubble.tsx` para complementar el contexto de la pregunta.

- **Cómo puedo convertir una respuesta base64 desde una API a un archivo reproducible como audio en React Native con Expo, asegurando que funcione en nativo y evitando errores al usar expo-file-system en web**
  En este caso, ayudó a diseñar una solución multiplataforma que distingue entre web y nativo usando Platform.OS, permitiendo usar las APIs y métodos correctos para guardar el blob como archivo `.mp3` en caché y reproducirlo en entornos nativos. Esta estructura resolvió errores como la falta de soporte de Buffer y writeAsStringAsync en web, y permitió mantener un sólo método de generación de audio en el backend, optimizando la experiencia en ambos entornos.

---

## 📂 Estructura del proyecto

```
/
├── app/                  # Navegación y entrypoints
├── components/           # UI reutilizable
├── features/             # Lógica agrupada por feature
├── utils/                # Funciones auxiliares
└── App.tsx               # Entry point de la app
```
