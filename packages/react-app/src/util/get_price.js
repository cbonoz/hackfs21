/**
 *
 * This file is auto-generated. Do not edit manually: changes may be erased.
 * Generated by Aqua compiler: https://github.com/fluencelabs/aqua/.
 * If you find any bugs, please write an issue on GitHub: https://github.com/fluencelabs/aqua/issues
 * Aqua version: 0.1.13-206
 *
 */
import { RequestFlowBuilder } from "@fluencelabs/fluence/dist/api.unstable";

export async function get_price(client, coin, currency, node, pg_sid, mean_sid, config) {
  let request;
  config = config || {};
  const promise = new Promise((resolve, reject) => {
    var r = new RequestFlowBuilder()
      .disableInjections()
      .withRawScript(
        `
 (xor
  (seq
   (seq
    (seq
     (seq
      (seq
       (seq
        (seq
         (seq
          (seq
           (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
           (call %init_peer_id% ("getDataSrv" "coin") [] coin)
          )
          (call %init_peer_id% ("getDataSrv" "currency") [] currency)
         )
         (call %init_peer_id% ("getDataSrv" "node") [] node)
        )
        (call %init_peer_id% ("getDataSrv" "pg_sid") [] pg_sid)
       )
       (call %init_peer_id% ("getDataSrv" "mean_sid") [] mean_sid)
      )
      (call -relay- ("op" "noop") [])
     )
     (xor
      (seq
       (seq
        (seq
         (seq
          (seq
           (seq
            (seq
             (call node ("op" "string_to_b58") [node] k)
             (call node ("peer" "timestamp_ms") [] ts_ms0)
            )
            (call node (pg_sid "price_getter") [coin currency ts_ms0] res0)
           )
           (call node ("op" "identity") [res0.$.result!] $prices)
          )
          (call node ("peer" "timestamp_ms") [] ts_ms1)
         )
         (call node (pg_sid "price_getter") [coin currency ts_ms1] res1)
        )
        (call node ("op" "identity") [res1.$.result!] $prices)
       )
       (call node (mean_sid "mean") [$prices] result)
      )
      (seq
       (call -relay- ("op" "noop") [])
       (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
      )
     )
    )
    (call -relay- ("op" "noop") [])
   )
   (xor
    (call %init_peer_id% ("callbackSrv" "response") [result])
    (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
   )
  )
  (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 3])
 )
 
             `,
      )
      .configHandler(h => {
        h.on("getDataSrv", "-relay-", () => {
          return client.relayPeerId;
        });
        h.on("getDataSrv", "coin", () => {
          return coin;
        });
        h.on("getDataSrv", "currency", () => {
          return currency;
        });
        h.on("getDataSrv", "node", () => {
          return node;
        });
        h.on("getDataSrv", "pg_sid", () => {
          return pg_sid;
        });
        h.on("getDataSrv", "mean_sid", () => {
          return mean_sid;
        });
        h.onEvent("callbackSrv", "response", args => {
          let opt = args;

          return resolve(opt);
        });

        h.onEvent("errorHandlingSrv", "error", args => {
          // assuming error is the single argument
          const [err] = args;
          reject(err);
        });
      })
      .handleScriptError(reject)
      .handleTimeout(() => {
        reject("Request timed out for get_price");
      });
    if (config.ttl) {
      r.withTTL(config.ttl);
    }
    request = r.build();
  });
  await client.initiateFlow(request);
  return promise;
}
