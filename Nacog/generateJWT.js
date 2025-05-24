function base64UrlEncode(str) {
  return str
    .toString(CryptoJS.enc.Base64)
    .replace(/=+$/, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function generateToken(secretSalt) {
  let header = {
    alg: "HS256",
    typ: "JWT",
  };

  const now = Math.floor(Date.now() / 1000);
  let payload = {
    openId: "123456",
    iat: now,
    exp: now + 2 * 60 * 60,
  };

  const encodedHeader = base64UrlEncode(
    CryptoJS.enc.Utf8.parse(JSON.stringify(header))
  );
  const encodedPayload = base64UrlEncode(
    CryptoJS.enc.Utf8.parse(JSON.stringify(payload))
  );

  const beforeSign = encodedHeader + "." + encodedPayload;
  const signature = base64UrlEncode(
    CryptoJS.HmacSHA256(beforeSign, CryptoJS.enc.Utf8.parse(secretSalt))
  );

  return beforeSign + "." + signature;
}
console.log(generateToken("code2022"));
