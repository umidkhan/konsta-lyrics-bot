const { Bot } = require("grammy");
const axios = require("axios");

const bot = new Bot("6489413438:AAHPGLd0RR881ef31y6FyvCRtT-PIeXHYPI");

bot.on("message", async (ctx) => {
  const firstName = ctx.from.first_name;
  const userName = ctx.from.username;
  const userId = ctx.from.id;
  const text = ctx.msg.text;
  bot.api.getChatMember(-1001965502067, userId).then((chatMember) => {
    const status = chatMember.status;
    if (
      status === "member" ||
      status === "administrator" ||
      status === "creator"
    ) {
      if (text === "/start") {
        ctx.reply(
          `Assalomu alaykum, <b>${firstName}</b>!\nUshbu bot Konsta tomonidan ijro qilingan treklarning matnlarini topib beradi\nShunachaki o'zingizga kerak bo'lgan trek nomini yozing\n\nAgar bot ishlashi bilan biror muammo bo'lgan bo'lsa @umidxon_polatxonov'ga murojaat qiling!\n\nBot haqidagi barcha yangiliklarni @LyricsLever kanalidan olishingiz mumkin`,
          { parse_mode: "HTML" }
        );
      } else if (text === "/info") {
        ctx.reply(
          `Ushbu bot NodeJS texnologiyasi orqali yaratilgan\nBot Konsta lyrics API'ga murojaat qiladi, API'da bor bo'lgan trek matini qaytaradi\nBot yaratuvchisi: @umidxon_polatxonov`
        );
      } else {
        axios
          .get(`https://konsta-lyrics-api.onrender.com/lyrics/${text}`)
          .then((res) => {
            ctx.reply(
              `${res.data}\n\n🤖@Konsta_matnlari_bot\n@LyricsLever kanali bilan hamkorlikda\n\n⚠️Matndan biror xato topgan bo'lsangiz @Janob_negativ'ga murojaat qiling`
            );
          })
          .catch(() =>
            ctx.reply(
              `Ushbu nomdagi trek matni hali qo'shilmagan yoki trek nomi noto'g'ri🤷‍♂️\nTekshirib qaytadan yuboring yoki matn qo'shilishini kuting\nAgar matn qo'shmoqchi bo'lsangiz @Janob_negativ'ga murojaat qiling`
            )
          );
      }
    } else if (
      status === "left" ||
      status === "kicked" ||
      status === "restricted"
    ) {
      ctx.reply(
        "Botdan to'liq foydalanish uchun @LyricsLever kanaliga obuna bo'ling"
      );
    }
  });
});

bot.start();
