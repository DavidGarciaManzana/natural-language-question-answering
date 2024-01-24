# Question answering
Use a pre-trained model to answer questions based on the content of a given passage.
1.Clone the .env.example file and create the .env file.

2.Execute the command: ```docker compose up -d```

3.Rebuild the Prisma client: ```npm run prisma:migrate:prod```
   ```
    "prisma:migrate:prod": "prisma migrate deploy",
   ```