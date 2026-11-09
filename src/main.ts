import "./style.css";type Student = {
  id: number;
  name: string;
  scores: number[];
};

function safeParse(json: string): unknown {
  try {
    return JSON.parse(json);
  } catch (error) {
    return null;
  }
}

function isStudent(x: unknown): x is Student {
  if (typeof x !== "object" || x === null) return false;

  const obj = x as Record<string, unknown>;

  return (
    typeof obj.id === "number" &&
    typeof obj.name === "string" &&
    Array.isArray(obj.scores) &&
    obj.scores.every((score) => typeof score === "number")
  );
}

function average(nums: number[]): number {
  if (nums.length === 0) return 0;
  const sum = nums.reduce((acc, curr) => acc + curr, 0);
  return sum / nums.length;
}

const validJson = '{"id":1,"name":"Hermione","scores":[95, 100, 98]}';
const appContainer = document.querySelector<HTMLDivElement>("#app");

function renderApp() {
  if (!appContainer) return;

  const parsedData = safeParse(validJson);

  if (isStudent(parsedData)) {
    const avg = average(parsedData.scores);
    appContainer.innerHTML = `
      <main class="card">
        <h1>Estudiante: ${parsedData.name}</h1>
        <p>Promedio de calificaciones: <strong>${avg.toFixed(2)}</strong></p>
      </main>
    `;
  } else {
    appContainer.innerHTML = `
      <main class="error-card">
        <h2>Error de Validación</h2>
        <p>Los datos recibidos no cumplen con la estructura requerida para un estudiante.</p>
      </main>
    `;
  }
}

renderApp();
