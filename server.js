const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();

// Sunucuya giden dosyalar buraya kaydedilecek
const yüklenen = multer({ dest: 'uploads/' });

// React build dizinini sunucuya servis et
app.use(express.static(path.join(__dirname, 'build')));

// Dosyayı yükleme ve işleme kısmı
app.post('/upload', yüklenen.single('file'), (req, res) => {
    const filePath = path.join(__dirname, req.file.path);

    // Dosya yolunu kontrol et
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            console.error('Dosya mevcut değil veya okunamıyor:', err);
            return res.status(500).send('Dosya mevcut değil veya okunamıyor');
        }

        // Dosyanın mevcut içeriğini oku
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error('Dosya okuma hatası:', err);
                return res.status(500).send('Dosya okuma hatası');
            }

            // Dosyanın içeriğine "değiştirdim" ifadesini ekle
            const modifiedData = data + '\ndeğiştirdim';

            // Dosyanın içeriğini üzerine yaz
            fs.writeFile(filePath, modifiedData, 'utf8', (err) => {
                if (err) {
                    console.error('Dosya yazma hatası:', err);
                    return res.status(500).send('Dosya yazma hatası');
                }

                // Başarı mesajı gönder
                res.status(200).json({
                    message: 'Dosya başarıyla değiştirildi.',
                    modifiedFile: path.basename(filePath),
                });
            });
        });
    });
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor`);
});
