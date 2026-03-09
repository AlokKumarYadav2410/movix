import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import {
  addFavourite,
  clearHistory,
  removeFavourite,
  removeHistoryItem
} from "../features/user/redux/userSlice";
import { showToast } from "../shared/ui/toastBus";

const isTooManyRequests = (message = "") => {
  return /too many|429/i.test(String(message));
};

const showRejectedToast = (message, fallback) => {
  if (isTooManyRequests(message)) {
    showToast({
      type: "warning",
      title: "Too Many Requests",
      message: "Please wait a moment before trying again.",
      duration: 3800
    });
    return;
  }

  showToast({
    type: "error",
    title: "Action Failed",
    message: message || fallback
  });
};

export const toastListenerMiddleware = createListenerMiddleware();

toastListenerMiddleware.startListening({
  matcher: isAnyOf(addFavourite.fulfilled),
  effect: () => {
    showToast({
      type: "success",
      title: "Added to Favourites",
      message: "Movie saved to your favourites list."
    });
  }
});

toastListenerMiddleware.startListening({
  matcher: isAnyOf(removeFavourite.fulfilled),
  effect: () => {
    showToast({
      type: "success",
      title: "Removed from Favourites",
      message: "Movie removed from your favourites list."
    });
  }
});

toastListenerMiddleware.startListening({
  matcher: isAnyOf(removeHistoryItem.fulfilled),
  effect: () => {
    showToast({
      type: "info",
      title: "History Updated",
      message: "This title was removed from watch history."
    });
  }
});

toastListenerMiddleware.startListening({
  matcher: isAnyOf(clearHistory.fulfilled),
  effect: () => {
    showToast({
      type: "info",
      title: "History Cleared",
      message: "Your full watch history is now empty."
    });
  }
});

toastListenerMiddleware.startListening({
  matcher: isAnyOf(addFavourite.rejected, removeFavourite.rejected, removeHistoryItem.rejected, clearHistory.rejected),
  effect: (action) => {
    showRejectedToast(action?.payload, "Please try again.");
  }
});
