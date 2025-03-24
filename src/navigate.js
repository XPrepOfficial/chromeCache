const { solveCaptcha } = require("./captchSolve");
const { webhooks } = require("./configs");
const { gmailWebhook } = require("./utils/common");

class Navigate {
	async goToConsole(page) {
		try {
			await page.setViewport({ width: 1200, height: 900 });
			console.log("HERE NAVIG");
			await page.goto(
				"https://accounts.google.com/ServiceLogin/webreauth?service=androiddeveloper&passive=true&continue=https%3A%2F%2Fplay.google.com%2Fconsole%2Fdeveloper%2F&_ga=2.93444693.911443792.1657109214-1217809937.1648618057&_gac=1.20968522.1657173339.Cj0KCQjw5ZSWBhCVARIsALERCvxZSuQNQWMDC2UZLjTgwrm78m44d3A1LU6lLe7PGFCRUKaSNWOfvd0aAveKEALw_wcB&flowName=GlifWebSignIn&flowEntry=ServiceLogin"
			);
			let btn = await page.$x(
				`//span[text()="Choose developer account"]`
			);
			btn = btn && btn[0];

			if (!btn) {
				// try{
				// 	await page.waitForNetworkIdle();
				// 	await page.waitForSelector('input[type="email"]', { timeout: 3000 });
				// 	await page.type(
				// 		'input[type="email"]',
				// 		"psupdates@classplus.co"
				// 	);
				// 	await page.click("#identifierNext");
				// }
				// catch(e){
				// 	console.log("> Signed out flow");
				// 	try{
				// 		const signIn = await page.waitForSelector('div[data-identifier="psupdates@classplus.co"]');
				// 		await signIn.click();
				// 	}
				// 	catch(e){
				// 		console.log("> Reenter account flow");
				// 		const btn = await page.waitForSelector('button[type="button"]');
				// 		await btn.click();
				// 	}
				// }
				// try {
				// 	await page.waitForNetworkIdle();
				// 	await page.waitForSelector('input[type="email"]', { timeout: 3000 });
				// 	// await page.type(
				// 	// 	'input[type="email"]',
				// 	// 	"psupdates@classplus.co"
				// 	// );
				// 	await page.click("#identifierNext");
				// 	try{
				// 		await page.waitForSelector('img[alt="CAPTCHA image of text used to distinguish humans from robots"]');
				// 		await new Promise(resolve => setTimeout(resolve, 2000));
				// 		const imageUrl = await page.evaluate(() => {
				// 			const img = document.querySelector('img[alt="CAPTCHA image of text used to distinguish humans from robots"]');
				// 			return img.src;
				// 		}
				// 		);
				// 		console.log("Captcha image url:", imageUrl);
				// 		const captchaText = await solveCaptcha(imageUrl);
				// 		const captchaInput = await page.waitForSelector('input[aria-label="Type the text you hear or see"]');
				// 		for (let i = 0; i < captchaText.length; i++) {
				// 			await captchaInput.type(captchaText[i], { delay: 100 });
				// 		}
				// 		await captchaInput.hover();
				// 		await new Promise(resolve => setTimeout(resolve, 2000));
				// 		const btn = await page.waitForSelector('button[type="button"]');
				// 		await btn.click();
				// 	}
				// 	catch(e){
				// 		console.log("No captcha found", e);
				// 	}
				// }
				// catch(e){
				// 	console.log("Direct password flow");
				// }
				// // get captcha img link id = "captchaimg"

				await page.waitForNetworkIdle();
				await page.waitForSelector('input[type="email"]', { timeout: 3000 });
				await page.type(
					'input[type="email"]',
					"psupdates@classplus.co"
				);
				await page.click("#identifierNext");
				console.log("Email entered > Password flow");
				await page.waitForNavigation({ waitUntil: "networkidle0" });
				await page.waitForSelector('input[type="password"]');
				await page.type(
					'input[type="password"]',
					"ClassplusUpdates2020"
				);
				await page.waitForSelector("#passwordNext");
				await page.click("#passwordNext");

				await page.waitForNavigation();
				await page.waitForNetworkIdle();
			} else {
				console.log("Console already logged in");
			}
		} catch (error) {
			await gmailWebhook(webhooks.serviceDown, {
				text: `Playstore login failed, Immediate action required`,
			});
			throw error;
		}
	}
}

module.exports = Navigate;
