(ns slipstream.ui.models.user
  (:require [net.cgrand.enlive-html :as html]))

(def sel-user 
  #{[:tag "user"]})

(defn user [metadata]
  "Extract user from metadata map (e.g. module, run)"
  (first (html/select metadata [:user])))

(defn attrs [metadata]
  "Extract user attrs from root map (e.g. module, run)"
  (-> metadata user :attrs))

(defn super? [metadata]
  (= "true" (:issuper (attrs metadata))))
  
