(ns slipstream.ui.views.messages)

(def help
  {:help-module-is-base "This image maps to an existing cloud-specific image, which SlipStream didn't create. For native images, you are required to provide cloud image identifiers for each cloud you want to use. For non-native images, you need to provide a reference image, which can be chained, to a native image."
   :help-reference-module "The image module this image inherits from."
   :help-cloud-image-ids "Contains the cloud specific image unique identifier (e.g. ami-xxxxxx for Amazon EC2)."
   :help-module-platform "The platform is defined by the native image and inherited by all derived images."
   :help-module-login "The login is defined by the native image and inherited by all derived images."})

(def msg
  {:msg-no-run-all "No deployment, run or build currently available"
   :msg-no-run-image "No image run or image build currently available"
   :msg-no-run-deployment "No deployment currently available"
   :msg-no-vm "No virtual machine currently available"})
  