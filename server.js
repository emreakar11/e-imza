const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1'); // Elliptic Curve Ayarı (secp256k1) kullanıyoruz

const app = express();

// Özel ve kamu anahtarlarını oluşturma
const key = ec.genKeyPair();
const publicKey = key.getPublic('hex');
const privateKey = key.getPrivate('hex');

// Sunucuya giden dosyalar buraya kaydedilecek
const yüklenen = multer({ dest: 'uploads/' });

// React build dizinini sunucuya servis et
app.use(express.static(path.join(__dirname, 'build')));

// Dosyayı yükleme ve imzalama kısmı
app.post('/upload', yüklenen.single('file'), (req, res) => {
    const filePath = path.join(__dirname, req.file.path);
    const metadataPath = filePath + '.sig';
    const publicKeyPath = path.join(__dirname, 'uploads', 'publicKey.pem');

    // Kamu anahtarını dosyaya yaz
    fs.writeFile(publicKeyPath, publicKey, 'utf8', (err) => {
        if (err) return res.status(500).send('publicKey dosyası yazma hatası');

        // Dosyayı ikili formatta oku
        fs.readFile(filePath, (err, data) => {
            if (err) return res.status(500).send('Dosya okuma hatası');

            // Veriyi hash'leme (SHA256)
            const hash = crypto.createHash('sha256').update(data).digest('hex');

            // Hash'i imzalama
            const signature = key.sign(hash).toDER('hex');

            // İmzayı metadata dosyasına yaz
            fs.writeFile(metadataPath, signature, 'utf8', (err) => {
                if (err) return res.status(500).send('İmza dosyası yazma hatası');

                // Kamu anahtarı ve imza dosyalarını kullanıcıya döndür
                res.status(200).json({
                    signatureFile: path.basename(metadataPath),
                    publicKeyFile: path.basename(publicKeyPath)
                });
            });
        });
    });
});
console.log('Private Key:', privateKey);

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor`);
});

