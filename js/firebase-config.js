// ============================================================
//  CONFIGURAÇÃO FIREBASE — Bolão Copa do Mundo
//  Substitua os valores abaixo pelos do seu projeto Firebase
//  Console: https://console.firebase.google.com
// ============================================================

const FIREBASE_CONFIG = {
  apiKey:            "COLE_AQUI_SUA_API_KEY",
  authDomain:        "SEU_PROJETO.firebaseapp.com",
  projectId:         "SEU_PROJETO",
  storageBucket:     "SEU_PROJETO.appspot.com",
  messagingSenderId: "SEU_SENDER_ID",
  appId:             "SEU_APP_ID"
};

// ============================================================
//  CONFIGURAÇÕES DO BOLÃO
// ============================================================
const BOLAO_CONFIG = {
  nome:        "Bolão Copa 2026",
  valorCota:   50.00,          // R$ por participante
  moeda:       "BRL",
  pixChave:    "SEU_PIX@email.com",

  // Regras de pontuação
  pontos: {
    placarExato:       10,
    vencedorMaisUmGol: 6,
    soVencedor:        3,
    empateAcertado:    3,
    errou:             0
  },

  // Prazo para fechar palpites (minutos antes do jogo)
  minutosAntes: 60,

  // Email do administrador (terá acesso ao painel admin)
  adminEmail: "admin@exemplo.com"
};

export { FIREBASE_CONFIG, BOLAO_CONFIG };
