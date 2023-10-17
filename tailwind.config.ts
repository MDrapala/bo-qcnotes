import type { Config } from "tailwindcss"

const qcmColors = {
  primary: "#3498db", // Couleur principale
  secondary: "#f39c12", // Couleur secondaire
  background: "#f2f2f2", // Couleur de fond
  text: "#333333", // Couleur du texte principal
  textSecondary: "#777777", // Couleur du texte secondaire
  success: "#27ae60", // Couleur de succès
  error: "#e74c3c" // Couleur d'erreur
}

const config: Config = {
  content: ["./**/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: qcmColors.primary,
        secondary: qcmColors.secondary,
        background: qcmColors.background,
        text: qcmColors.text,
        "text-secondary": qcmColors.textSecondary,
        success: qcmColors.success,
        error: qcmColors.error
      }
    }
  },
  plugins: []
}
export default config
