# 🏆 Bolão Copa 2026 — Guia de Implantação

## Estrutura do projeto

```
bolao-copa/
├── index.html          ← App principal (login + palpites + ranking)
├── admin/
│   └── index.html      ← Painel administrativo
└── css/
    └── style.css       ← Estilos globais
```

---

## Passo 1 — Criar projeto Firebase

1. Acesse https://console.firebase.google.com
2. Clique em **"Criar projeto"**
3. Nome sugerido: `bolao-copa-2026`
4. Ative o Google Analytics (opcional)

---

## Passo 2 — Ativar Authentication

1. No menu lateral: **Build → Authentication**
2. Clique em **"Começar"**
3. Aba **"Sign-in method"**
4. Ative **"E-mail/senha"**

---

## Passo 3 — Criar banco Firestore

1. No menu lateral: **Build → Firestore Database**
2. Clique em **"Criar banco de dados"**
3. Escolha **modo produção** (depois ajustamos as regras)
4. Escolha a região: **southamerica-east1** (São Paulo)

### Regras de segurança do Firestore

No Firestore, vá em **Regras** e cole:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Qualquer usuário autenticado pode ler usuários e jogos
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth.uid == userId;
    }

    // Somente admin pode criar/editar jogos
    match /jogos/{jogoId} {
      allow read: if request.auth != null;
      allow write: if request.auth.token.email == "admin@email.com";
    }

    // Usuário só pode criar/editar os próprios palpites
    match /palpites/{palpiteId} {
      allow read: if request.auth != null;
      allow create: if request.auth.uid == request.resource.data.userId;
      allow update: if request.auth.uid == resource.data.userId;
    }

    // Admin pode atualizar pontos dos usuários
    match /users/{userId} {
      allow update: if request.auth.token.email == "admin@email.com";
    }
  }
}
```

---

## Passo 4 — Obter credenciais e configurar o projeto

1. No console Firebase: clique na engrenagem ⚙ → **Configurações do projeto**
2. Em **"Seus apps"**, clique em **"</>  Web"**
3. Registre o app com o nome `bolao-web`
4. Copie o objeto `firebaseConfig`

Abra os arquivos e substitua em **AMBOS**:
- `index.html` (na linha da variável `FIREBASE_CONFIG`)
- `admin/index.html` (mesma variável)

Também ajuste nestes mesmos arquivos:
```javascript
const ADMIN_EMAIL = "SEU_EMAIL_ADMIN@email.com";  // seu e-mail de administrador
```

E no `index.html`:
```javascript
const BOLAO = {
  nome:       "Bolão Copa 2026",
  valorCota:  50.00,             // valor em R$
  pixChave:   "SEU_PIX@email.com",
  adminEmail: "SEU_EMAIL_ADMIN@email.com",
  ...
};
```

---

## Passo 5 — Ativar Firebase Hosting

```bash
# Instale o Firebase CLI (precisa do Node.js)
npm install -g firebase-tools

# Faça login
firebase login

# Dentro da pasta bolao-copa:
firebase init hosting

# Responda:
# → Use an existing project → selecione seu projeto
# → Public directory: . (ponto — a pasta atual)
# → Single-page app: No
# → GitHub deploys: No

# Publique
firebase deploy --only hosting
```

Seu bolão estará disponível em:
`https://SEU_PROJETO.web.app`

---

## Passo 6 — Criar conta admin

1. Abra o site publicado
2. Crie uma conta com o e-mail que você definiu em `adminEmail`
3. O link "Admin" aparecerá automaticamente no menu

---

## Como usar o sistema

### Participantes
1. Acessam o site e criam sua conta
2. Fazem palpites de placar para cada jogo
3. Palpites ficam bloqueados 60 min antes do jogo
4. Acompanham ranking e pontuação em tempo real

### Administrador
1. Acessa o painel admin pelo link no menu
2. Cadastra os jogos com data, hora e bandeiras
3. Confirma pagamento de cada participante
4. Após cada jogo: registra o resultado
5. O sistema calcula os pontos automaticamente

---

## Regras de pontuação

| Acerto          | Pontos |
|-----------------|--------|
| Placar exato    | 10 pts |
| Vencedor + gols de 1 time | 6 pts |
| Só o vencedor / empate certo | 3 pts |
| Errou tudo      | 0 pts  |

---

## Evolução futura sugerida

- [ ] Notificações por e-mail (Firebase Extensions)
- [ ] Regra de desempate (ex: mais placares exatos)
- [ ] Bolão de campeão geral
- [ ] Compartilhamento de palpite nas redes sociais
- [ ] Histórico de edições de palpite
- [ ] PWA (instalar no celular como app)
- [ ] Integração com API de resultados automática

---

## Suporte

Em caso de dúvidas na implantação, verifique:
- Console Firebase: https://console.firebase.google.com
- Documentação: https://firebase.google.com/docs
