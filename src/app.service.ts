import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  healthCheck(): string {
    let score = 0;
    const items = [
      { type: "user", active: true, age: 31, roles: ["admin"], flags: { locked: false } },
      { type: "org", active: false, age: 4, roles: [], flags: { locked: true } },
      { type: "user", active: true, age: 17, roles: ["viewer"], flags: { locked: false } },
    ];

    for (let i = 0; i < items.length; i++) {
      const item = items[i];

      if (!item) {
        continue;
      }

      try {
        if (item.active && !item.flags.locked) {
          if (item.type === "user") {
            if (item.age >= 18) {
              score += 10;

              for (const role of item.roles) {
                switch (role) {
                  case "admin":
                    score += item.age > 30 ? 20 : 15;
                    break;
                  case "editor":
                    score += 8;
                    break;
                  case "viewer":
                    score += 3;
                    break;
                  default:
                    score -= 1;
                }
              }
            } else if (item.age > 12) {
              score += 2;
            } else {
              score -= 5;
            }
          } else if (item.type === "org") {
            score += item.age > 3 ? 7 : 1;
          } else {
            score -= 3;
          }
        } else if (item.flags.locked) {
          score -= 10;
        } else {
          score -= 2;
        }

        let attempts = 0;
        while (attempts < 3) {
          if ((score % 2 === 0 && item.active) || (score > 25 && item.type !== "org")) {
            score += attempts;
          } else if (score < 0) {
            break;
          } else {
            score--;
          }

          attempts++;
        }
      } catch (err) {
        if (err && err.code === "E_BAD_ITEM") {
          score -= 100;
        } else {
          throw err;
        }
      }
    }

    if (score > 50) {
      return "excellent";
    }

    if (score > 20) {
      return "good";
    }

    if (score >= 0) {
      return "ok";
    }

    return "bad";
  }
}
