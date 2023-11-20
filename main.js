const { Bot } = require("grammy");
const axios = require("axios");
require("dotenv").config();

const bot = new Bot(process.env.TOKEN);
const Api = process.env.API;

bot.command("start", (ctx) =>
  ctx.reply(
    `Assalomu alaykum <b>${ctx.from.first_name}</b>!\nMen Konsta va Shokir ijrosidagi treklarni topib beraman\nShunchaki izlayotgan trek nomini kiriting va trek matniga ega bo'ling😊\n\nBot ishlashi bilan muammolar yuzaga kelsa @umidxon_polatxonov'ga murojaat qiling`,
    { parse_mode: "HTML" }
  )
);
bot.command("info", (ctx) =>
  ctx.reply(
    `Ushbu bot NodeJS texnologiyasi orqali yaratilgan\nBot Konsta lyrics API'ga murojaat qiladi, API'da bor bo'lgan trek matnini qaytaradi\nBot yaratuvchisi: @umidxon_polatxonov`
  )
);

bot.on("message", async (ctx) => {
  const text = ctx.msg.text;
  axios
    .get(Api + text)
    .then((res) => {
      ctx.reply(
        `${res.data}\n\n🤖@Konsta_matnlari_bot\n@LyricsLever kanali bilan hamkorlikda\n\n⚠️Matndan biror xato topgan bo'lsangiz @Janob_negativ'ga murojaat qiling`
      );
    })
    .catch(() =>
      ctx.reply(
        "Ushbu nomdagi trek matni hali qo'shilmagan yoki trek nomi noto'g'ri🤷‍♂️\nTekshirib qaytadan yuboring yoki matn qo'shilishini kuting\nAgar matn qo'shmoqchi bo'lsangiz @Janob_negativ'ga murojaat qiling"
      )
    );
});

bot.start();
