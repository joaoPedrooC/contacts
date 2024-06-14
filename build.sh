// build.sh
#!/usr/bin/env bash
# exit on error
set -o errexit

npm install
npm run build
npm prisma generate
npx prisma migrate deploy
