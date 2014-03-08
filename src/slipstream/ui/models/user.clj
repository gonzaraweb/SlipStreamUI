(ns slipstream.ui.models.user
  (:require [net.cgrand.enlive-html :as html]
            [slipstream.ui.models.common :as common]))

(def sel-user 
  #{[:tag "user"]})

(defn user [metadata]
  "Extract user from metadata map (e.g. module, run)"
  (first (html/select metadata #{[html/root :> :user] [:user]})))

(defn logged-in [metadata]
  "Extract logged-in user from metadata map (e.g. module, run)"
  (first (html/select metadata [html/root :> :user])))

(defn attrs [metadata]
  "Extract user attrs from root map (e.g. module, run)"
  (-> metadata user :attrs))

(defn super? [metadata]
  (= "true" (:issuper (attrs metadata))))
  
(defn username [metadata]
  (:name (attrs metadata)))

(defn default-cloud [metadata]
  (common/parameter-enum-select-value metadata "General.default.cloud.service"))
