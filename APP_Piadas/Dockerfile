# Imagem base do Python
FROM python:3.10-slim

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos
COPY requirements.txt .
COPY main.py .

# Instala as dependências
RUN pip install --no-cache-dir -r requirements.txt

# Comando para rodar o script
CMD ["python", "main.py"]


