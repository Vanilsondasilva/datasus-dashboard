

# Rodar Servidos: python3 -m http.server 8080

# Como fazer commit e enviar para o GitHub

1. **Adicione as mudanças no staging:**
   ```bash
   git add .
   ```
   (ou, para adicionar arquivos específicos: `git add nome-do-arquivo`)

2. **Faça o commit das alterações:**
   ```bash
   git commit -m "Descreva aqui o que mudou"
   ```

3. **Envie (push) para o repositório remoto:**
   ```bash
   git push
   ```

## Observações

- Se for a primeira vez enviando uma branch nova, use:
  ```bash
  git push -u origin nome-da-branch
  ```
  Depois disso, basta `git push`.

- Sempre escreva mensagens de commit que resumam as alterações feitas.

- Para ver o status dos arquivos alterados:
  ```bash
  git status
  ```

- Para ver o histórico de commits:
  ```bash
  git log
  ```

---
Pronto! Salve este arquivo no seu repositório para lembrar dos comandos principais do git.