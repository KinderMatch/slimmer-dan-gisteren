# Encrypted customer dashboard delivery

The public GitHub Pages site hosts only a login shell and encrypted dashboard exports.
Each customer has a separate RSA-3072 key pair. The private key is encrypted with a random
24-character password using PBKDF2-SHA256 (600,000 iterations) and AES-256-GCM.
A fresh AES-256-GCM content key and IV protect each gzip-compressed HTML export;
RSA-OAEP-SHA256 wraps that content key. Associated data binds ciphertext to its customer
and key ID. Passwords and unencrypted private keys must never enter this repository.

Customer exports use the Data plugin's supported `staticDemo: true` read-only runtime.
No GitHub, Sites, Google Drive, website-administration or other customer permissions
are granted by unlocking a dashboard. Decrypted content exists in the browser only;
locking removes its iframe document. Ordinary public website pages remain public.

## Weekly refresh

Refresh takes place in the private reporting workspace. Client account identifiers, source
document identifiers, meeting transcripts and identity checks remain there. After the
complete read-only export is checked, encrypt it using the customer's public key and
update only its bundle.json. The public key is enough; no customer password is needed.
Run scripts/validate-dashboard-security.mjs and the crypto tests before publication.
Do not publish raw exports, spreadsheets, source snapshots, password lists or private keys.
Do not replace or rotate keyring.json during an ordinary refresh.
