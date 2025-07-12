const express = require('express');
const router = express.Router();
const Swap = require('../models/Swap');
const Item = require('../models/Item');
const protect = require('../middlewares/authMiddleware');

// @route   POST api/swaps
// @desc    Create a new swap request
// @access  Private
router.post('/', protect, async (req, res) => {
  const { itemId } = req.body;

  try {
    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).json({ msg: 'Item not found' });
    }

    if (item.listedBy.toString() === req.user._id.toString()) {
      return res.status(400).json({ msg: 'You cannot swap for your own item' });
    }

    const existingSwap = await Swap.findOne({
      itemRequested: itemId,
      requester: req.user._id,
    });

    if (existingSwap) {
      return res.status(400).json({ msg: 'You have already requested a swap for this item' });
    }

    const newSwap = new Swap({
      itemRequested: itemId,
      requester: req.user._id,
      owner: item.listedBy,
    });

    const swap = await newSwap.save();
    res.status(201).json(swap);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/swaps/my-swaps
// @desc    Get all swaps for the logged-in user
// @access  Private
router.get('/my-swaps', protect, async (req, res) => {
  try {
    const incomingRequests = await Swap.find({ owner: req.user._id, status: 'pending' })
      .populate('requester', 'name')
      .populate('itemRequested', 'title images');

    const outgoingRequests = await Swap.find({ requester: req.user._id })
      .populate('owner', 'name')
      .populate('itemRequested', 'title images');

    res.json({ incomingRequests, outgoingRequests });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/swaps/:id
// @desc    Accept or reject a swap request
// @access  Private
router.put('/:id', protect, async (req, res) => {
  const { status } = req.body;

  if (!['accepted', 'rejected'].includes(status)) {
    return res.status(400).json({ msg: 'Invalid status update' });
  }

  try {
    let swap = await Swap.findById(req.params.id);

    if (!swap) {
      return res.status(404).json({ msg: 'Swap not found' });
    }

    if (swap.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    if (swap.status !== 'pending') {
      return res.status(400).json({ msg: `Swap has already been ${swap.status}` });
    }

    swap.status = status;
    await swap.save();

    // If accepted, mark the item as unavailable
    if (status === 'accepted') {
      await Item.findByIdAndUpdate(swap.itemRequested, { status: 'swapped' });
      // Optionally, reject other pending swaps for this item
      await Swap.updateMany(
        { itemRequested: swap.itemRequested, status: 'pending' },
        { status: 'rejected' }
      );
    }

    res.json(swap);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
