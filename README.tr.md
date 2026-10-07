# SnowShoe

SnowShoe, Avalanche için açık kaynaklı bir builder stack'idir. Builder'ların ve yapay zeka ajanlarının Avalanche üzerinde ürün çıkarmak için ihtiyaç duyduğu üç şeyi bir araya getirir:

- **Skill'ler.** Bir ajanın ya da insanın tek bir işi bitirmek için izleyebileceği, doğrulanmış adım adım talimatlar.
- **MCP araçları.** Ajanların Avalanche ağlarında işlem yapmasını sağlayan Model Context Protocol sunucusu.
- **Kit'ler.** Çalıştırılabilir başlangıç repoları ve demolar.

Proje Team1 Türkiye'ye aittir. Tüm Team1 üyeleri ve Avalanche builder'ları katkı verebilir.

English version: [README.md](README.md)

## Bu repo neden var

Builder onboarding yapan ekipler her kohortta aynı kurulum işini tekrar eder. SnowShoe bu işi paylaşılan, sürümlenen ve gözden geçirilen varlıklara dönüştürür.

Repo, herkes kendi yetkinliği içinde çalışsın diye düzenlenmiştir. Yazarlar skill ve doküman yazar. Mühendisler araç ve kit geliştirir. Tasarımcılar marka işini yapar. Facilitator'lar workshop kiti hazırlar. Reviewer'lar kaliteyi korur. Faydalı bir katkı için tüm stack'i bilmek gerekmez.

## Repo haritası

| Yol | İçerik | Kimler katkı verir |
| --- | --- | --- |
| `skills/` | Builder yolculuğuna ve protokole göre gruplanmış doğrulanmış skill'ler | Teknik yazarlar, protokol ekipleri, builder'lar |
| `packages/mcp-server/` | MCP sunucusu ve araç manifesti | TypeScript mühendisleri |
| `kits/` | Başlangıç repoları ve demolar | Full-stack ve akıllı kontrat geliştiricileri |
| `ideas/` | Proje fikirleri ve araştırma listesi | Ürün düşünenler, araştırmacılar |
| `prompts/` | Katkı araçları için sistem promptları | Yapay zeka asistanı kullanan herkes |
| `docs/` | Mimari, rehberler, kararlar, yol haritası | Yazarlar, maintainer'lar |
| `community/` | Workshop kitleri, bounty politikası | Facilitator'lar, topluluk liderleri |

## Kendi track'ini bul

| Sen kimsin | Katkı alanın | Buradan başla |
| --- | --- | --- |
| Yazar ya da eğitmen | Skill, doküman, eğitim içeriği | [docs/skill-authoring.md](docs/skill-authoring.md) |
| TypeScript mühendisi | MCP araçları, script'ler | [docs/mcp-tool-authoring.md](docs/mcp-tool-authoring.md) |
| Akıllı kontrat ya da full-stack geliştirici | Kit, demo | [docs/kit-authoring.md](docs/kit-authoring.md) |
| Ürün düşünen biri | Fikir, araştırma | [ideas/README.md](ideas/README.md) |
| Test eden biri | Eval, hata raporu | [docs/evals.md](docs/evals.md) |
| Güvenlik araştırmacısı | İnceleme, tehdit raporu | [SECURITY.md](SECURITY.md) |
| Çevirmen | Türkçe ve diğer diller | [docs/translations.md](docs/translations.md) |
| Tasarımcı | Marka, diyagram, görsel | [docs/tracks.md](docs/tracks.md) |
| Topluluk organizatörü | Workshop kiti, etkinlik | [community/README.md](community/README.md) |

İlk katkın için [docs/first-contribution.md](docs/first-contribution.md) dosyasını izle. Yaklaşık 30 dakika sürer.

## Hızlı başlangıç

```bash
git clone https://github.com/team1-turkiye/snowshoe.git
cd snowshoe
npm run setup
npm run validate
```

Repoda çalışma zamanı bağımlılığı yoktur. Node.js 20 ve üzeri yeterlidir.

## İlkeler

1. **Önce Fuji.** Her skill ve kit, mainnet'e dokunmadan önce Fuji testnet'inde çalışır.
2. **Küçük araç yüzeyi.** Uzun araç listeleri ajanın bağlamını tüketir. Bir skill işi göremiyorsa araç ekleriz.
3. **Skill veridir.** Skill, testleri olan ve gözden geçirilmiş bir metindir. Çalıştırılabilir kod değildir.
4. **Doğrulanmış demek test edilmiş demektir.** Bir skill, eval'leri geçmeden ve bir reviewer uçtan uca çalıştırmadan `verified` olmaz.
5. **Sır yok.** Repoda, skill'lerde ve promptlarda özel anahtar, seed phrase ya da API anahtarı bulunmaz.

## Yönetişim ve davranış

- [GOVERNANCE.md](GOVERNANCE.md)
- [MAINTAINERS.md](MAINTAINERS.md)
- [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)
- [SECURITY.md](SECURITY.md)

## Lisans

MIT. [LICENSE](LICENSE) dosyasına bakın.
